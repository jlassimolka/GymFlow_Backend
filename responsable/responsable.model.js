const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the responsable
const responsableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  CIN: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',  // Reference to the user that trains this Adherent
    required: false,
  } ,
  profilePicture: {
    type : Schema.Types.ObjectId,
    ref: 'Document',
    require: false,
  }
});

// Create the model from the schema
const Responsable = mongoose.model('Responsable', responsableSchema);

module.exports = Responsable;
