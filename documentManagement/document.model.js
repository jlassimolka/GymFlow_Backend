const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
    fileName: String,
    path: String,
    fileType: String,
    size: Number,
    originalName: String
});

module.exports = mongoose.model('Document', DocumentSchema);
