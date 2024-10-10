const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { SchemaTypes } = require("mongoose");
let ejs = require('ejs');
let pdf = require ('html-pdf');
let path = require('path');
const fs = require('fs');
const uuid = require ('uuis');
const auth = require('../services/authentication');
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const BillSchema = new Schema({
  uuid: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    // required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  contactNumber: {
    type: String,
    // required: [true, 'Phone number is required'],
    trim: true,
  },
  total: {
    type: Number,
    trim: true,
  },
  paymentMethod: {
    type: String,
    trim: true,
  },
  createdBy: {
    type: String,
    // unique: true,
    trim: true,
  },
  coachDetails: {
    type: SchemaTypes.Mixed,
    default: null, // or you can set a default structure like default: {}
  },
});

module.exports = mongoose.model("Bill", BillSchema);

app.post('/generateReport', auth.authenticateToken, async (req, res) => {
  try {
    const generateuuid = uuid.v1();
    const abonnementDetails = req.body;
    const coachDetailsReport = JSON.parse(abonnementDetails.coachDetails);

    // Create new bill document
    const newBill = new Bill({
      uuid: generateuuid,
      name: abonnementDetails.name,
      email: abonnementDetails.email,
      contactNumber: abonnementDetails.contactNumber,
      paymentMethod: abonnementDetails.paymentMethod,
      total: abonnementDetails.total,
      coachDetails: abonnementDetails.coachDetails,
      createdBy: res.locals.email
    });

    await newBill.save();

    // Render EJS template
    ejs.renderFile(path.join(__dirname, "", "report.ejs"), {
      coachDetails: coachDetailsReport,
      email: abonnementDetails.email,
      contactNumber: abonnementDetails.contactNumber,
      paymentMethod: abonnementDetails.paymentMethod,
      total: abonnementDetails.total,
      coachDetails: abonnementDetails.coachDetails
    }, (err, data) => {
      if (err) {
        return res.status(500).json(err);
      } else {
        // Create PDF
        pdf.create(data).toFile('./generated_pdf/' + generateuuid + ".pdf", (err, data) => {
          if (err) {
            console.log(err);
            return res.status(500).json(err);
          } else {
            return res.status(200).json({ uuid: generateuuid });
          }
        });
      }
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = app;