const ChessPiece = require('./ChessPiece');
const data = require('../data');
const helpers = require('../helpers');

const {
  findCurrentKingMoves,
} = helpers;

const {
  blackKing,
  whiteKing,
} = data.icons;

class King extends ChessPiece {
  constructor(color, row, column) {
    super(color, row, column);
    this.label = 'King';
    this.type = 'king';
    this.icon = color === 'black' ? blackKing : whiteKing;
    this.generateCurrentOptions = (king, squares, pieceRow, pieceCol, pieces, player) => {
      return findCurrentKingMoves(king, squares, pieceRow, pieceCol, pieces, player);
    };
    this.isKing = true;
  }
}

module.exports = King;