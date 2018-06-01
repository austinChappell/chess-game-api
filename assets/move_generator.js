const helpers = require('./helpers');

const {
  findCurrentBishopMoves,
  findCurrentKingMoves,
  findCurrentKnightMoves,
  findCurrentPawnMoves,
  findCurrentRookMoves,
} = helpers;

const moves = {
  pawn: (self, squares, pieceRow, pieceCol, pieces) => {
    const { hasMoved, orientation } = self;

    if (hasMoved) {
      self.maxY = orientation > 0 ? 1 : 0;
      self.minY = orientation > 0 ? 0 : -1;
    } else {
      self.maxY = orientation > 0 ? 2 : 0;
    }

    const maxRow = pieceRow + self.maxY;
    const minRow = pieceRow + self.minY;
    const maxCol = pieceCol + self.maxX;
    const minCol = pieceCol + self.minX;

    return findCurrentPawnMoves(self, squares, maxRow, minRow, maxCol, minCol, pieces);
  },
  rook: (piece, squares, pieceRow, pieceCol, pieces) => {
    return findCurrentRookMoves(piece, squares, pieceRow, pieceCol, pieces);
  },
  knight: (self, squares, pieceRow, pieceCol, pieces) => {
    return findCurrentKnightMoves(self, squares, pieceRow, pieceCol, pieces);
  },
  bishop: (piece, squares, pieceRow, pieceCol, pieces) => {
    return findCurrentBishopMoves(piece, squares, pieceRow, pieceCol, pieces);
  },
  queen: (self, squares, pieceRow, pieceCol, pieces) => {
    const straightOptions = findCurrentRookMoves(self, squares, pieceRow, pieceCol, pieces);
    const diagOptions = findCurrentBishopMoves(self, squares, pieceRow, pieceCol, pieces);
    const allOptions = [...straightOptions, ...diagOptions];
    return allOptions;
  },
  king: (self, squares, pieceRow, pieceCol, pieces, player) => {
    return findCurrentKingMoves(self, squares, pieceRow, pieceCol, pieces, player);
  },
};



module.exports = moves;
