const { validationResult } = require('express-validator');

const Book = require('../models/book');
const { clearImage } = require('../utils/course');

exports.getBooks = async (req, res, next) => {
    // const currentPage = Number.parseInt(req.query.page) || 1;
    // const perPage = Number.parseInt(req.query.perpage) || 4;
    try {
        const totalBook = await Book.find().countDocuments();
        const books = await Book.find();
            // .skip((currentPage - 1) * perPage)
            // .limit(perPage);

        res.status(200).json({ books, totalBook });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getBook = async (req, res, next) => {
    const bookId = req.params.bookId;
    try {
        const book = await Book.findById(bookId);
        if (!book) {
            const error = new Error('Could not find book.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ book });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.createBook = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation Error.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const { title, price, info } = req.body;
        const imageUrl = `images/${req.file.filename}`;

        if (!imageUrl) {
            const error = new Error('Please select an image to upload.');
            error.statusCode = 422;
            throw error;
        }

        const book = new Book({
            title,
            price,
            imageUrl,
            info,
            creator: req.userId
        });
        await book.save();

        res.status(201).json({ message: 'Book created.', book });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateBook = async (req, res, next) => {
    const bookId = req.params.bookId;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }

        let { title, price, imageUrl, info } = req.body;
        if (req.file) {
            imageUrl = `images/${req.file.filename}`;
        }
        if (!imageUrl) {
            const error = new Error('No image picked.');
            error.statusCode = 422;
            throw error;
        }

        const book = await Book.findById(bookId);

        if (!book) {
            const error = new Error('Could not find the book.');
            error.statusCode = 404;
            throw error;
        }

        if (imageUrl !== book.imageUrl) {
            console.log(book.imageUrl);
            clearImage(book.imageUrl);
        }

        book.title = title;
        book.price = price;
        book.imageUrl = imageUrl;
        book.info = info;

        await book.save();

        res.status(200).json({ message: 'Book updated.', book });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteBook = async (req, res, next) => {
    const bookId = req.params.bookId;

    try {
        const book = await Book.findById(bookId);
        if (!book) {
            const error = new Error('Could not find the book.');
            error.statusCode = 404;
            throw error;
        }
        clearImage(book.imageUrl);
        await Book.findByIdAndRemove(bookId);

        res.status(200).json({ message: 'Book has been deleted.' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
