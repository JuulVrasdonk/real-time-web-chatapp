require('dotenv').config()
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = process.env.PORT
const path = require('path')
const io = require('socket.io')(http)

// Doe dan Miranda.
app.set('view engine', 'ejs')
// app.set('views', './views')

app.use(express.static('public'));

// Maak een route voor de index
app.get('/', function (req, res) {
    res.render('index')
})

io.on('connection', (socket) => {
    console.log('a user connected')
  
    socket.on('message', (message) => {
      io.emit('message', message)
    })
  
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })

server.listen(port, () => {
  console.log(`Listening to port ${port}`);
});