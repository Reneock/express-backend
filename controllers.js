const AuthorModel = require('./authorModel');
const BookModel = require('./model');

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

const createAuthorController =(req, res) => {
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
  listBooksController,
  createBookController,
  updateBookController,
  deleteBookController,
  createAuthorController,
  listAuthorController
}