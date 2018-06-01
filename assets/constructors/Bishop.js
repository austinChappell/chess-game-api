const ChessPiece = require('./ChessPiece');
const data = require('../data');
const helpers = require('../helpers');

const {
  findCurrentBishopMoves,
} = helpers;

const {
  blackBishop,
  whiteBishop,
} = data.icons;

class Bishop extends ChessPiece {
  constructor(color, row, column) {
    super(color, row, column);
    this.label = 'Bishop';
    this.type = 'bishop';
    this.icon = color === 'black' ? blackBishop : whiteBishop;
    this.generateCurrentOptions = (bishop, squares, pieceRow, pieceCol, pieces) => {
      return findCurrentBishopMoves(bishop, squares, pieceRow, pieceCol, pieces);
    };
  }
}

module.exports = Bishop;