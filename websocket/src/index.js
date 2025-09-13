const express = require('express');
const { createServer } = require('node:http');

const Port = 8000
const app = express();
const server = createServer(app);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(Port, () => {
  console.log('server running at http://localhost:8000');
});