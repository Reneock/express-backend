const BookModel = require('../models/book');
const AuthorModel = require('../models/author');
const {validationResult} = require('express-validator');

const listBooksController = (req, res) => {
  const{id} = req.params;
  if (id){
    BookModel.find({author: id}).then (books => {
      res.json({data: books});
    }).catch(err => console.log(err));
  }else{
    BookModel.find().then (books => {
      res.json({data: books});
    }).catch(err => console.log(err));
  } 
}

const createBookController = (req, res) => {
  //validation check
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.json({message: errors.array()[0].msg});
  }
  
  const {title, author, description} = req.body;
  const book = new BookModel({title, author, description});
  book.save().then(result => {
    res.json({message: "book created", data: result});
  }).catch(error => console.log(error));
}

const updateBookController = (req, res) => {
  const {title, author, description} = req.body;

  BookModel.findById(id).then( book => {
    if(book){
      book.title = title;
      book.author = author;
      book.description = description;

      book.save();

      res.json({message: "book updated", data: book});
    }
    res.json({message: "book not updated"});
  }).catch(err => console.log(err));
}

const deleteBookController = (req, res) => {
  const {id} = req.body;
  const deletedBook = BookModel.findByIdAndRemove(id).then(deletedBook => {
    if(deletedBook){
      AuthorModel.deleteMany({bookId: deletedBook._id}).then(result => {
        res.json({message: "book deleted", data: deletedBook});
      }).catch(err => console.log(err));
      return;
    }
  res.json({message: "book not found"});
  });
}

module.exports = {
  listBooksController,
  createBookController,
  updateBookController,
  deleteBookController
}