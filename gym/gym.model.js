const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define the schema for the gym
const gymSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  openingHours: {
    Monday: String,
    Tuesday: String,
    Wednesday: String,
    Thursday: String,
    Friday: String,
    Saturday: String,
    Sunday: String,
  },

  memberCount: {
    type: Number,
    default: 0
  },
  services: {
    type: [String] // List of offered services, e.g., ["group classes", "personal training", ...]
  },
  contact: {
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  
  coaches: [{ type: Schema.Types.ObjectId, ref: 'Coach' }] ,
  adherents: [{ type: Schema.Types.ObjectId, ref: 'Adherent' }] ,
  

  manager: { 
    type: Schema.Types.ObjectId, 
    ref: 'Manager'
    // required: true 
  }, // Reference to the Manager responsible for this gym

  profilePicture: {
    type : Schema.Types.ObjectId,
    ref: 'Document',
    require: false,
  }



});

const Gym = mongoose.model('Gym', gymSchema);

module.exports = Gym;
