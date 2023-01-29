const express = require('express');
const {body} = require('express-validator');
const {listBooksController, createBookController, updateBookController, deleteBookController} = require('../controllers/books');
const router = express.Router();

router.get('/book/:id?', listBooksController);
router.post('/book', [
  body('title').trim().not().isEmpty().withMessage('Title cannot be empty'),
  body('author').trim().not().isEmpty().withMessage('Author cannot be empty'),
  body('description').trim().not().isEmpty().withMessage('Description cannot be empty')
], createBookController);
router.put('/book', updateBookController);
router.delete('/book', deleteBookController);

module.exports = router;