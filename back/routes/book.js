const express = require('express');
const { body } = require('express-validator');

const bookController = require('../controllers/book');
const { isAuth } = require('../middlewares/is-auth');
const upload = require('../utils/multer');

const router = express.Router();

//──── GET Http Methods ──────────────────────────────────────────────────────────────────
// GET /api/books
router.get('/books', bookController.getBooks);

// GET /api/book/:bookId
router.get('/book/:bookId', bookController.getBook);
//──── GET Http Methods ──────────────────────────────────────────────────────────────────

//──── POST Http Methods ─────────────────────────────────────────────────────────────────
// POST /api/book
router.post(
    '/book',
    isAuth,
    upload.single('imageUrl'),
    [
        body('title')
            .trim()
            .isLength({ min: 5 })
            .not()
            .isEmpty(),
        body('info')
            .trim()
            .not()
            .isEmpty()
    ],
    bookController.createBook
);
//──── POST Http Methods ─────────────────────────────────────────────────────────────────

//──── PUT Http Methods ──────────────────────────────────────────────────────────────────
// PUT /api/book/:bookId
router.put(
    '/book/:bookId',
    isAuth,
    upload.single('imageUrl'),
    [
        body('title')
            .trim()
            .isLength({ min: 5 })
            .not()
            .isEmpty(),
        body('info')
            .trim()
            .not()
            .isEmpty()
    ],
    bookController.updateBook
);
//──── PUT Http Methods ──────────────────────────────────────────────────────────────────

//──── DELETE Http Methods ───────────────────────────────────────────────────────────────
// DELETE /api/book/:bookId
router.delete('/book/:bookId', isAuth, bookController.deleteBook);
//──── DELETE Http Methods ───────────────────────────────────────────────────────────────

module.exports = router;
