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

// const updateBookController = (req, res) => {
//   const {title, author, description} = req.body;
//   const updatedBook = BookModel.update({title, author, description});
//   res.json({message: "book updated", data: updatedBook});
// }

// const deleteBookController = (req, res) => {
//   const {title} = req.body;
//   const deletedBook = BookModel.delete({title});
//   res.json({message: "book deleted", data: deletedBook});
// }

module.exports = {
  listBooksController,
  createBookController
  // updateBookController,
  // deleteBookController
}