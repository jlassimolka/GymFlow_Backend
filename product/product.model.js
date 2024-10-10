const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define the schema for the product
const productSchema = new mongoose.Schema({
    labelle: {
        type: String,
        required: true
    },
    prix: {
        type: String,
        required: true
    }
});

// Create the model from the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
