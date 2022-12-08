const express = require('express');
const server = express();

//handling request and server methods
server.use('/services', (req, res) => res.send("Enjoy our services"));
server.get('/gallery', (req, res)=> res.send('Browse through the gallery'));
server.put('/about', (req, res)=> res.send('How we started'));
server.post('/signup', (req, res) => res.send("<h1>Join us now, signup</h1>"));

server.listen(5000, () => {console.log("Request received, wait for response")});