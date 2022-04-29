const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(http)
const port = 2022

app.use(express.static(path.resolve('public')))

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('message', (message) => {
    io.emit('message', message)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  // socket.on('mouse', (data) => {
  //   console.log('iets');
  // })


  socket.on('mouse', (data) =>  {
    // Data comes in as whatever was sent, including objects
    // console.log("Received: 'mouse' " + data.x + " " + data.y);  
    // console.log(data);    
    // Send it to all other clients
    socket.broadcast.emit('mouse', data);
  }
);
})


http.listen(port, () => {
  console.log('listening on port ', port)
})
