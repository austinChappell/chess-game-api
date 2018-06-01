const blackPawn =
  "https://res.cloudinary.com/daat30w68/image/upload/v1527783179/black_pawn.png";
const blackRook =
  "https://res.cloudinary.com/daat30w68/image/upload/v1527783179/black_rook.png";
const blackQueen =
  "https://res.cloudinary.com/daat30w68/image/upload/v1527783179/black_queen.png";
const blackKing =
  "https://res.cloudinary.com/daat30w68/image/upload/v1527783179/black_king.png";
const blackBishop =
  "https://res.cloudinary.com/daat30w68/image/upload/v1527783179/black_bishop.png";
const blackKnight =
  "https://res.cloudinary.com/daat30w68/image/upload/v1527783179/black_knight.png";

const whitePawn =
  "https://res.cloudinary.com/daat30w68/image/upload/v1527783179/white_pawn.png";
const whiteRook =
  "https://res.cloudinary.com/daat30w68/image/upload/v1527783179/white_rook.png";
const whiteQueen =
  "https://res.cloudinary.com/daat30w68/image/upload/v1527783179/white_queen.png";
const whiteKing =
  "https://res.cloudinary.com/daat30w68/image/upload/v1527783179/white_king.png";
const whiteBishop =
  "https://res.cloudinary.com/daat30w68/image/upload/v1527783179/white_bishop.png";
const whiteKnight =
  "https://res.cloudinary.com/daat30w68/image/upload/v1527783179/white_knight.png";

const devAPI = 'http://localhost:5000';
const prodAPI = 'https://chess-game-api.herokuapp.com';
const baseAPI = process.env.REACT_APP_ENV === 'development' ? devAPI : prodAPI;

const data = {
  api: `${baseAPI}/api`,
  // api: prodAPI,
  baseAPI,
  icons: {
    blackBishop,
    blackKing,
    blackKnight,
    blackPawn,
    blackQueen,
    blackRook,
    whiteBishop,
    whiteKing,
    whiteKnight,
    whitePawn,
    whiteQueen,
    whiteRook,
  },
};

module.exports = data;
