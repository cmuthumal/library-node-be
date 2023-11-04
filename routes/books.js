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
router.get('/:id', getBook, (req, res) => {
    res.send(res.book);
});

router.post('/', async (req, res) => {
    const book = new Book({
        name: req.body.name,
        isbn: req.body.isbn,
        author: req.body.author
    });

    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', getBook, async (req, res) => {
    if (req.body.name != null) {
        res.book.name = req.body.name;
    }
    if (req.body.isbn != null) {
        res.book.isbn = req.body.isbn;
    }
    if (req.body.author != null) {
        res.book.author = req.body.author;
    }

    try {
        const updatedBook = await res.book.save();
        res.status(201).json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// this function retrieves a book for a given ID from the DB
async function getBook(req, res, next) {
    let book;
    try {
        book = await Book.findById(req.params.id);

        if (book == null) {
            return res.status(404).json({ message: "Can't find a book for the ID." });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.book = book;
    next();
}

module.exports = router;