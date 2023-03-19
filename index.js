const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const items = require('./items.json')
const options = {
    message: `Select 1 to Place an order
    Select 99 to checkout order
    Select 98 to see order history
    Select 97 to see current order
    Select 0 to cancel order
    `,
    1: placeOrder(),
    99: "hi",
    98: "hi",
    97: "hi",
    0: "hi",
}


function placeOrder() {
    return items.join("\n")
}
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.emit('send options', options)

  socket.on('send message', msg => {
     if (msg !== 'message' && ! options[1]) return "Invalid response"

     let response = options[1]
     socket.emit('send response', response)
  })
  
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});