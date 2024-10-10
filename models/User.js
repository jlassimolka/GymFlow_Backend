const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['ROLE_ADHERENT', 'ROLE_MANAGER', 'ROLE_COACHE','ROLE_ADMIN'],
    required: true
  }
}, { timestamps: true });

// Create the User model
const User = mongoose.model('User', UserSchema);

module.exports = User;
