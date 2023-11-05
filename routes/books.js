const express = require('express');
const router = express.Router();
const Book = require('../models/book');

router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const result = {};
        const startInd = (page - 1) * limit;
        const endInd = page * limit;

        const books = await Book.find();
        if (endInd < books.length) {
            result.next = {
                page: page + 1,
                limit: limit
            }
        }
        if (startInd > 0) {
            result.previous = {
                page: page - 1,
                limit: limit
            }
        }
        result.length = books.length;
        result.page = page;

        result.results = books.slice(startInd, endInd);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const book = await Book.findOne({ _id: req.params.id }).
        populate('author').
        exec();
    res.send(book);
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