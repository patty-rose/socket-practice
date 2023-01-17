const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
//Express initializes app to be a function handler that you can supply to an HTTP server

const { Server } = require("socket.io");
const io = new Server(server);
//nitialize a new instance of socket.io by passing the server (the HTTP server) object.

app.get('/', (req, res) => {//We define a route handler / that gets called when we hit our website home.
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('user typing', (msg) => {
    io.emit('user typing', msg);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});//listen on the connection event for incoming sockets and log it to the console.

server.listen(3000, () => {//We make the http server listen on port 3000.
  console.log('listening on *:3000');
});