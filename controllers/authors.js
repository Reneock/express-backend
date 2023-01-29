const AuthorModel = require('../models/author');
const {validationResult} = require('express-validator');

const createAuthorController =(req, res) => {
  //validation check
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.json({message: errors.array()[0].msg});
  }
  
  const {name, email, country, bookId} = req.body;
  const author = new AuthorModel({name, email, country, bookId});
  author.save().then(result => {
    if(result)
    res.json({message: "Author Created", data: result});
    else
    res.json({message: "Failed to Create Author"});
  });
}

const listAuthorController = (req, res) => {
  AuthorModel.find()
  .populate("bookId")
  .then(authors => { res.json({data: authors});}).catch(err => console.log(err));
}

module.exports = {
  createAuthorController,
  listAuthorController
}