const express = require('express');
const bodyParser = require('body-parser');
const {listBooksController, createBookController, updateBookController, deleteBookController} = require('./controllers');
const server = express('server');
server.use(bodyParser.json());

//routes
server.get('/book', listBooksController);
server.post('/book', createBookController);
server.put('/book', updateBookController);
server.delete('/book', deleteBookController);

server.listen(5000, () => console.log("book server started"));