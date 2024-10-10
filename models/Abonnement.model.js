const mongoose = require( 'mongoose');
const Schema = mongoose.Schema;

const AbonnementSchema = new Schema({
    TypeAbon: {
        type: String,
        required: [true, 'Type is required'],
        trim: true,
        enum: {
          values: ['Mensuel', 'Trimestriel', 'Annuel'],
          message: 'Type must be Mensuel, Trimestriel, or Annuel'
        }
      },
  prix: {
    type: Number,
    required: [true, 'Price is required']
  },
  durée: {
    type: Number,
    required: [true, 'Duration is required']
  },
  sallePercentage: {
    type: Number,
    required: [true, 'Salle percentage is required']
  },
  coachPercentage: {
    type: Number,
    required: [true, 'Coach percentage is required']
  }
});

module.exports = mongoose.model('Abonnement', AbonnementSchema);
