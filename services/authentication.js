require('dotenv').config();
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  console.log("Authorization Header:", authHeader); // Debugging

  if (!authHeader) {
    return res.sendStatus(401); // No auth header
  }

  // Correct the split logic to get the token part
  const token = authHeader.split(' ')[1];
  console.log("Extracted Token:", token); // Debugging

  if (!token) {
    return res.sendStatus(401); // No token
  }

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, response) => {
    if (err) {
      console.error("Token Verification Error:", err); // Debugging
      return res.sendStatus(403);
    }
    res.locals = response;
    next();
  });
}

module.exports = { authenticateToken: authenticateToken };
