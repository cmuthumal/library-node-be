const mongoose = require('mongoose');
const Author = require('./author');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    }
});

module.exports = mongoose.model('Book', bookSchema);