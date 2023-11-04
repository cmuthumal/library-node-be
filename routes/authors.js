const express = require('express');
const router = express.Router();
const Author = require('../models/author');

router.get('/', async (req, res) => {
    try {
        const authors = await Author.find();
        res.json(authors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', getAuthor, (req, res) => {
    res.send(res.author);
});

router.post('/', async (req, res) => {
    const author = new Author({
        first_name: req.body.firstName,
        last_name: req.body.lastName
    });

    try {
        const newAuthor = await author.save();
        res.status(201).json(newAuthor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', getAuthor, async (req, res) => {
    if (req.body.first_name != null) {
        res.author.first_name = req.body.first_name;
    }
    if (req.body.last_name != null) {
        res.author.last_name = req.body.last_name;
    }

    try {
        const updatedAuthor = await res.author.save();
        res.status(201).json(updatedAuthor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// this function retrieves an author for a given ID from the DB
async function getAuthor(req, res, next) {
    let author;
    try {
        author = await Author.findById(req.params.id);

        if (author == null) {
            return res.status(404).json({ message: "Can't find an author for the ID." });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.author = author;
    next();
}

module.exports = router;