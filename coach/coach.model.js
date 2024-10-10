const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoachSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  numeroDeTel: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  CIN: {
    type: String,
    required: [true, 'CIN is required'],
    unique: true,
    trim: true
  },

  status: {
    type: String,
    default: 'active'
  },
  price: {
    type: Number
  },
  trainingSpecialties: {
    type: [String],
    required: [true, 'Training specialties are required'],
    enum: ['Yoga', 'Fitness', 'Pilates', 'CrossFit', 'Bodybuilding', 'Cardio', 'Dance', 'Martial Arts'],
    default: ['Fitness']
  },
  gyms: [{ type: Schema.Types.ObjectId, ref: 'Gym' }],
  adherents: [{ type: Schema.Types.ObjectId, ref: 'Adherent' }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',  // Reference to the Coach that trains this Adherent
    required: false,
  },
  profilePicture: {
    type : Schema.Types.ObjectId,
    ref: 'Document',
    require: false,
  }


});

module.exports = mongoose.model('Coach', CoachSchema);
