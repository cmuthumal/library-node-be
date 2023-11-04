const express = require('express');
const router = express.Router();

// GET /authors
// Returns a list of authors in the database in JSON format.
router.get('/', (req, res) => {
    res.send('get all authors');
});

// GET /author/{{id}}
// Returns a detailed view of the specified author id.
router.get('/:id', (req, res) => {
    res.send('get author by id ' + req.params.id);
});

// POST /author
// Creates a new author with the specified details.
// Expects a JSON body.
router.post('/', (req, res) => {
    res.send('post author');
});

// PUT /author/{{id}}
// Updates an existing author.
// Expects a JSON body.
router.put('/:id', (req, res) => {
    res.send('put author ' + req.params.id);
});

module.exports = router;