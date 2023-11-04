require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to the database'));

app.use(express.json());

const booksRouter = require('./routes/books');
const authorsRouter = require('./routes/authors');
app.use('/book', booksRouter);
app.use('/books', booksRouter);
app.use('/author', authorsRouter);
app.use('/authors', authorsRouter);

app.listen(3000, () => console.log('Server is running...'));