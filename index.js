const express = require('express');
const path = require('path');
const server = express('server');

//middleware definitions
server.use(express.static(path.join(__dirname, 'public')));

server.listen(5000, () => console.log("Request received, wait for response"));