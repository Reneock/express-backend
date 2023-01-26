const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {listBooksController, createBookController, updateBookController, deleteBookController, createAuthorController, listAuthorController} = require('./controllers');

const server = express('server');
server.use(bodyParser.json());

server.get('/book/:id?', listBooksController);
server.post('/book', createBookController);
server.put('/book', updateBookController);
server.delete('/book', deleteBookController);
server.post('/author', createAuthorController);
server.get('/author', listAuthorController);

mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://BookCollection:KSpTvvmLuZz0j9mw@cluster0.0o28abb.mongodb.net/BookCollection?retryWrites=true&w=majority"
).then(result =>{
  server.listen(5000, () => console.log("book server started"));
}).catch(err => console.log(err));