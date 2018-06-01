const ChessPiece = require("./ChessPiece");
const data = require("../data");

const {
  blackPawn,
  whitePawn,
} = data.icons;

class Pawn extends ChessPiece {
  // orientation to know which way is forward
  // either +1 or -1
  // this is used to advance the pawn when moving
  constructor(color, row, column, orientation) {
    super(color, row, column);
    this.label = 'Pawn';
    this.type = 'pawn';
    this.icon = color === 'black' ? blackPawn : whitePawn;
    this.orientation = orientation;
    this.maxY = orientation > 0 ? orientation : 0;
    this.minY = orientation < 0 ? orientation : 0;
    this.maxX = 1;
    this.minX = -1;
    this.allowedMoves = [];
  }

}

module.exports = Pawn;
