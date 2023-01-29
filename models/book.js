const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  _id: {type: Schema.Types.ObjectId},
  title: {type: String, required: true},
  author: {type: String, required: true},
  description: {type: String, required: true},
  authors: [
    {authorId: {required: true, type: Schema.Types.ObjectId, ref:"Author"}}
  ]
});

const BookModel = mongoose.model("Book", BookSchema);
module.exports = BookModel;