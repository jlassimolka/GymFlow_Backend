const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define the schema for the product

    const adherentSchema = new Schema({
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
          ref: 'Gym',
          required: true,
        },
        coach: {
          type: Schema.Types.ObjectId,
          ref: 'Coach',  // Reference to the Coach that trains this Adherent
          required: false,
        },
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',  // Reference to the user that trains this Adherent
          required: false,
        },
        profilePicture: {
          type : Schema.Types.ObjectId,
          ref: 'Document',
          require: false,
        }

});

// Create the model from the schema
module.exports = mongoose.model('Adherent', adherentSchema);
