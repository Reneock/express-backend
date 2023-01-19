const BookModel = require('./model');

const listBooksController = (req, res) => {
  const books = BookModel.all();
  res.json({data: books});
}

const createBookController = (req, res) => {
  const {title, author, description} = req.body;
  const book = new BookModel({title, author, description});
  book.save();
  res.json({message: "book created", data: book});
}

const updateBookController = (req, res) => {
  const {title, author, description} = req.body;
  const updatedBook = BookModel.update({title, author, description});
  res.json({message: "book updated", data: updatedBook});
}

const deleteBookController = (req, res) => {
  const {title} = req.body;
  const deletedBook = BookModel.delete({title});
  res.json({message: "book deleted", data: deletedBook});
}

module.exports = {
  listBooksController,
  createBookController,
  updateBookController,
  deleteBookController
}