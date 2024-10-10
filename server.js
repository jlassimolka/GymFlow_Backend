require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

const nodemailer = require("nodemailer");
const auth = require("./services/authentication");
const checkRole = require("./services/checkRole");
const Gym = require('./gym/gym.model'); // Adjust the path as needed
const Coach = require('./coach/coach.model');
const Manager = require('./manager/manager.model');
const Adherent = require('./adherent/adherent.model');
const Responsable = require('./responsable/responsable.model');




app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('DB_NAME:', process.env.DB_NAME);

mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME })
  .then(() => {
    console.log("mongodb connected.", process.env.DB_NAME);
  })
  .catch((err) => console.log(err.message));

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to db");
});

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose connection is disconnected.");
});




app.get("/", (req, res) => {
  res.send("Hello from node API updated");
});


const managerRoutes = require('./manager/manager.routes');
app.use(managerRoutes);

const adherentRoutes = require('./adherent/adherent.routes');
app.use(adherentRoutes);

const gymRoutes = require('./gym/gym.routes');
app.use(gymRoutes);

const coachRoutes = require('./coach/coach.routes');
app.use(coachRoutes);

const productRoutes = require('./product/product.routes');
app.use(productRoutes);

const responsableRoutes = require('./responsable/responsable.routes');
app.use(responsableRoutes);

const documentRoutes = require('./documentManagement/document.routes');
app.use(documentRoutes);
// User Registration Route
app.post("/api/user", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login Route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Incorrect Username or Password" });
    }

    if (user.password !== password) {
      return res
        .status(401)
        .json({ message: "Incorrect Username or Password" });
    }

    // if (user.status === "false") {
    //   return res.status(401).json({ message: "Wait for Admin Approval" });
    // }

    
    let userData ;
    if(user.role == "ROLE_COACHE"){
      userData = await Coach.findOne({user : {_id : user._id}})
    }
    if(user.role == "ROLE_MANAGER"){
      userData = await Manager.findOne({user : {_id : user._id}})
    }
    if(user.role == "ROLE_ADHERENT"){
      userData = await Adherent.findOne({user : {_id : user._id}})
    }
    if(user.role == "ROLE_ADMIN"){
      userData = await Responsable.findOne({user : {_id : user._id}})
    }
    const accessToken = jwt.sign(
      { email: user.email, role: user.role, user : userData },
      ACCESS_TOKEN,
      { expiresIn: "8h" }
    );

    res.status(200).json({ token: accessToken, user : userData , role : user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Forget Password Route
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

app.post("/api/forgotPassword", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Send password recovery email
    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Password Recovery for GymFIT",
      html: `<p>Your login details for GymFIT SYSTEM:</p>
             <p><b>Email:</b> ${user.email}</p>
             <p><b>Password:</b> ${user.password}</p>
             <p><a href="http://localhost:4200/">Click here to Login</a></p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to send email." });
      }
      console.log("Email sent:", info.response);
      return res
        .status(200)
        .json({ message: "Password sent successfully to your email." });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Route pour obtenir tous les utilisateurs
app.get(
  "/api/getusers",
  auth.authenticateToken,
  checkRole.checkRole,
  async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Route pour obtenir un utilisateur par ID
app.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route pour mettre à jour un utilisateur par ID
app.put(
  "/api/users/:id",
  auth.authenticateToken,
  checkRole.checkRole,
  async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndUpdate(id, req.body, { new: true });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Route pour supprimer un utilisateur par ID
app.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/checkToken", auth.authenticateToken, (req, res) => {
  return res.status(200).json({ message: "true" });
});

app.post("/changePassword", auth.authenticateToken, async (req, res) => {
  const user = req.body;
  const email = res.locals.email;

  try {
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.status(400).json({ message: "User not found." });
    }

    if (existingUser.password !== user.oldPassword) {
      return res.status(400).json({ message: "Incorrect Old Password." });
    }

    existingUser.password = user.newPassword;

    await existingUser.save();

    return res.status(200).json({ message: "Password Updated Successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error." });
  }
});


















const PORT = process.env.PORT || 3000

app.listen(PORT,() =>{

    console.log(`Server running on port ${PORT}`)
})
