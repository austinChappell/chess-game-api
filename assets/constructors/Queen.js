const ChessPiece = require("./ChessPiece");
const data = require("../data");
const helpers = require("../helpers");

const {
  findCurrentBishopMoves,
  findCurrentRookMoves,
} = helpers;

const {
  blackQueen,
  whiteQueen,
} = data.icons;

class Queen extends ChessPiece {
  constructor(color, row, column) {
    super(color, row, column);
    this.label = 'Queen';
    this.type = 'queen';
    this.icon = color === 'black' ? blackQueen : whiteQueen;
    this.generateCurrentOptions = (queen, squares, pieceRow, pieceCol, pieces) => {
      const straightOptions = findCurrentRookMoves(queen, squares, pieceRow, pieceCol, pieces);
      const diagOptions = findCurrentBishopMoves(queen, squares, pieceRow, pieceCol, pieces);
      const allOptions = [...straightOptions, ...diagOptions];
      return allOptions;
    };
  }
}

module.exports = Queen;