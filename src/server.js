const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

const path = require('path');

const app = express();
app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
  socket.connect('connectRoom', box => {
    socket.join(box);
  })
});

mongoose.connect('mongodb+srv://joaopedrochiquitin:painapel123@cluster0.enzys.mongodb.net/omnistack?retryWrites=true&w=majority', {
  useNewUrlParser: true,
});

app.use((request, response, next) => {
  request.io = io;

  return next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

server.listen(3333);