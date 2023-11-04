const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// GET /books
// Returns a list of books in the database in JSON format.
// Should be able to paginate the response.
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /book/{{id}}/
// Returns a detailed view of the specified book id.
// Nest author details in JSON format.
router.get('/:id', (req, res) => {
    res.send('get book by id ' + req.params.id);
});

// POST /book
// Creates a new book with the specified details.
// Expects a JSON body.
router.post('/', (req, res) => {
    res.send('post book');
});

// PUT /book/{{id}}
// Updates an existing book.
// Expects a JSON body.
router.put('/:id', (req, res) => {
    res.send('put book ' + req.params.id);
});

module.exports = router;