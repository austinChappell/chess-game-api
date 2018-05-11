require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const socket = require('socket.io');

const dbConfig = require('./db.config');

// dbConfig.initializeUsers();

const PORT = process.env.PORT || 6000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', process.env.CLIENT);
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Max-Age', 1728000);

  next();
});

app.use(session({
  secret: 'chessgame',
  resave: false,
  saveUninitialized: false,
  // cookie: {
  //   secure: false
  // },

  path: '/*', // NEEDED
}));

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json({
  limit: '50mb',
}));

app.use(passport.initialize());
app.use(passport.session());
require('./passportconfig').configure(passport);

app.use('/api/auth/', require('./routes/auth'));

const server = app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('SOCKET IS CONNECTED');
  // here you can start emitting events to the client
  socket.on('CREATE_GAME', (game) => {
    console.log('GAME RECEIVED', game);
    game.id = Math.floor(Math.random() * 100000000);
    io.emit('RECEIVE_GAME', game);
  });

  socket.on('JOIN_GAME', (game) => {
    // game.id = Math.floor(Math.random() * 100000000);
    io.emit('START_GAME', game);
  })

  socket.on('MOVE_PIECE', (data) => {
    console.log('RECEIVED MOVE', data);
    io.emit('PUSH_MOVE', data);
  });

  socket.on('ROOM', (data) => {
    const { room, userId } = data;
    console.log('INCOMING ROOM', room);
    socket.join(room);
    socket.emit('RECEIVE_ID', userId);
    console.log(`USER ${userId} JOINED ROOM #${room}`);
  });

  socket.on('SELECT_PIECE', (data) => {
    io.emit('PUSH_SELECT_PIECE', data);
  });

  socket.on('SET_IDS', (ids) => {
    io.emit('RECEIVE_IDS', ids);
  })

});

const gameIo = socket(server, { path: '/game/:id' });

gameIo.on('connection', (socket) => {
  console.log('SOCKET IS CONNECTED TO GAME');
});