const pieceConstructor = require('../assets/constructors/pieces');

const { Bishop, King, Knight, Pawn, Queen, Rook } = pieceConstructor;

const pawn = new Pawn('orange', 1, 1, 1);

const pieces = [
  new Pawn('white', 7, 1, -1),
  new Pawn('white', 7, 2, -1),
  new Pawn('white', 7, 3, -1),
  new Pawn('white', 7, 4, -1),
  new Pawn('white', 7, 5, -1),
  new Pawn('white', 7, 6, -1),
  new Pawn('white', 7, 7, -1),
  new Pawn('white', 7, 8, -1),
  new Rook('white', 8, 1),
  new Knight('white', 8, 2),
  new Bishop('white', 8, 3),
  new Queen('white', 8, 4),
  new King('white', 8, 5),
  new Bishop('white', 8, 6),
  new Knight('white', 8, 7),
  new Rook('white', 8, 8),
  new Pawn('black', 2, 1, 1),
  new Pawn('black', 2, 2, 1),
  new Pawn('black', 2, 3, 1),
  new Pawn('black', 2, 4, 1),
  new Pawn('black', 2, 5, 1),
  new Pawn('black', 2, 6, 1),
  new Pawn('black', 2, 7, 1),
  new Pawn('black', 2, 8, 1),
  new Rook('black', 1, 1),
  new Knight('black', 1, 2),
  new Bishop('black', 1, 3),
  new Queen('black', 1, 4),
  new King('black', 1, 5),
  new Bishop('black', 1, 6),
  new Knight('black', 1, 7),
  new Rook('black', 1, 8),
];

module.exports = { pieces };