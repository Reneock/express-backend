const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
  title: String,
  author: String,
  description: String
});

const BookModel = mongoose.model("Book", BookSchema);

module.exports = BookModel;