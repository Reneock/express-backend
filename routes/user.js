const express = require('express');
const {body} = require('express-validator');
const userModel = require('../models/user');
const router = express.Router();
const {signupController, signinController}  = require('../controllers/user');

router.put('/signup', [
  body('name').trim().not().isEmpty().withMessage("user name is required"),
  body('email').isEmail().withMessage("Email is invalid").custom((value, {req}) =>{
    //check if email is already taken
    return userModel.findOne({email: value}).then( userDoc => {
      if(userDoc)
        return Promise.reject("email already taken");
    });
  }),
  body('password').trim().isLength({min: 5})
] ,signupController);

router.post('/signin', [
  body('email').isEmail().withMessage("Email is invalid"),
  body('password').trim().isLength({min: 5})
], signinController);

module.exports = router;