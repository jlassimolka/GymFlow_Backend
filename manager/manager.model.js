const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const managerSchema = new Schema({
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
  gym: { 
    type: Schema.Types.ObjectId, 
    ref: 'Gym', // Reference to the Gym managed by this Manager
    unique: true 
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
  
}, { timestamps: true });

module.exports = mongoose.model('Manager', managerSchema);