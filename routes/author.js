const express = require('express');
const {body} = require('express-validator');
const {createAuthorController, listAuthorController} = require('../controllers/authors');
const AuthorModel = require('../models/author');
const router = express.Router();

router.post('/author',[
  body('name').trim().not().isEmpty().withMessage('Name cannot be empty'),
  body('email').trim().not().isEmpty().withMessage('Email cannot be empty'),
  body('country').trim().not().isEmpty().withMessage('Country cannot be empty'),
  body('bookId').trim().not().isEmpty().withMessage('Book Id must be filled').custom((value, {req}) => {
    return AuthorModel.findOne({'bookId': value}).then(
      authorDoc => {
        if (authorDoc)
          return Promise.reject('Book Id already in use');
      }
    )
  })
], createAuthorController);
router.get('/author', listAuthorController);

module.exports = router;