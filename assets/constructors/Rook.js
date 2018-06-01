const ChessPiece = require("./ChessPiece");
const data = require("../data");
const helpers = require("../helpers");

const {
  findCurrentRookMoves,
} = helpers;

const {
  blackRook,
  whiteRook,
} = data.icons;

class Rook extends ChessPiece {
  constructor(color, row, column) {
    super(color, row, column);
    this.label = 'Rook';
    this.type = 'rook';
    this.icon = color === 'black' ? blackRook : whiteRook;
    this.generateCurrentOptions = (rook, squares, pieceRow, pieceCol, pieces) => {
      return findCurrentRookMoves(rook, squares, pieceRow, pieceCol, pieces);
    };
    this.isRook = true;
  }
}

module.exports = Rook;
