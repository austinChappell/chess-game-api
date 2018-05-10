require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

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

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
