const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const server = express('server');

const loginRequestHandler = (req, res) => {
  console.log(req.body.email);
  console.log(req.body.password);
  res.send('Done');
}
//middleware definitions
server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParser.urlencoded({extended: false}));

//route 
server.post('/login', loginRequestHandler);

server.listen(5000, () => console.log("Request received, wait for response"));