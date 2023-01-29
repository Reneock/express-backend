const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authorRoutes = require('./routes/author');
const bookRoutes = require('./routes/book');

const server = express('server');
server.use(bodyParser.json());

//routes
server.use(authorRoutes);
server.use(bookRoutes);

mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://BookCollection:KSpTvvmLuZz0j9mw@cluster0.0o28abb.mongodb.net/BookCollection?retryWrites=true&w=majority"
).then(result =>{
  server.listen(5000, () => console.log("book server started"));
}).catch(err => console.log(err));