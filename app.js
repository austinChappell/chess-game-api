require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const socket = require('socket.io');

const dbConfig = require('./db.config');
const generator = require('./assets/generator');
const helpers = require('./assets/helpers');
const moveGenerator = require('./assets/move_generator');

const {
  mapPiecesToSquares,
  prepMove,
} = helpers;

const squares = helpers.generateSquares();
const { pieces } = generator;
const players = [
  {
    castled: false,
    color: 'black',
    hasBeenChecked: false,
    isTurn: false,
    label: 'Player One',
  },
  {
    castled: false,
    color: 'white',
    hasBeenChecked: false,
    isTurn: true,
    label: 'Player Two',
  },
];

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

  // here you can start emitting events to the client
  socket.on('CREATE_GAME', (game) => {
    game.id = Math.floor(Math.random() * 100000000);
    io.emit('RECEIVE_GAME', game);
  });

  socket.on('INIT_GAME', () => {
    const newSquares = mapPiecesToSquares(pieces, squares);
    console.log('NEW SQUARES', newSquares);
    const data = { pieces: JSON.stringify(pieces), squares: newSquares };
    io.emit('CREATE_SQUARES', data);
  })

  socket.on('SELECT_PIECE', (data) => {
    const { piece } = data;
    const activePlayer = players.find(p => p.isTurn);
    const isValid = piece.color === activePlayer.color;
    if (isValid) {
      const newPieces = pieces.map(p => {
        const sameCol = p.column === piece.column;
        const sameRow = p.row === piece.row;
        const newObj = Object.assign({}, p, {
          allowedMoves: [],
          selected: sameCol && sameRow,
        });
        return newObj;
      });
      const selected = newPieces.find(p => p.selected);
      const { type } = selected;
      const moves = moveGenerator[type](selected, squares, selected.row, selected.column, newPieces, activePlayer);
      
      selected.allowedMoves = moves;
      
      // if it was already selected, deselect it
      if (piece.selected) {
        selected.selected = false;
        selected.allowedMoves = [];
      }

      io.emit('UPDATE_PIECES', newPieces);
    } else {
      console.log('NOT VALID');
    }
  });

  socket.on('PREP_MOVE', (data) => {
    prepMove(Object.assign({}, data, {players, squares}));
  })

  socket.on('JOIN_GAME', (game) => {
    io.emit('START_GAME', game);
  });

  socket.on('MOVE_PIECE', (data) => {
    io.emit('PUSH_MOVE', data);
  });

  socket.on('ROOM', (data) => {
    const { room, userId } = data;
    socket.join(room);
    socket.emit('RECEIVE_ID', userId);
  });

  socket.on('SELECT_PIECE', (data) => {
    io.emit('PUSH_SELECT_PIECE', data);
  });

  socket.on('SET_IDS', (ids) => {
    io.emit('RECEIVE_IDS', ids);
  });

  socket.on('EXCHANGE_PIECE', ({ newPiece, pawn }) => {
    io.emit('EXCHANGE', ({ newPiece, pawn }));
  });

});

const gameIo = socket(server, { path: '/game/:id' });

gameIo.on('connection', (socket) => {
  console.log('SOCKET IS CONNECTED TO GAME');
});