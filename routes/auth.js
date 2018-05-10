const express = require('express');
const bcrypt = require('bcryptjs');
const {
  Client,
} = require('pg');
const passport = require('passport');
const request = require('request');
const router = express.Router();

const User = require('../models/user');
const jwt = require('jsonwebtoken');

const dataStore = require('../assets/store');

const {
  dbConfig,
} = dataStore;

const d = new Date();
const db = {
  updateOrCreate(user, cb) {
    // db dummy, we just cb the user
    cb(null, user);
  },
};

function serialize(req, res, next) {
  console.log('SERIALIZE RUNNING')
  db.updateOrCreate(req.user, (err, user) => {
    if (err) {
      return next(err);
    }
    // we store the updated information in req.user again
    req.user = user;
    next();
  });
}

function generateToken(req, res, next) {
  const sig = {
    id: req.user.id,
  };
  const secret = 'server secret';
  const expiration = {
    expiresIn: '30 days',
  };
  req.token = jwt.sign(sig, secret, expiration);
  next();
}

function respond(req, res) {
  res.status(200).json({
    user: req.user,
    token: req.token,
  });
}

// router.post('/login', (req, res) => {
//   console.log('HELLO FROM THE LOGIN ROUTE');
// },)

router.post('/login', passport.authenticate('local', {
  session: false,
}), serialize, generateToken, respond);

router.post('/signup', (req, res) => {
  const {
    password,
    username,
  } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const passwordHash = password ? bcrypt.hashSync(password, salt) : null;
  const client = new Client();

  client.connect().then(() => {
    const sql = `
      INSERT INTO users
        (username, password_hash)
        VALUES ($1, $2)
        RETURNING *
      `;
    const params = [username, passwordHash];
    return client.query(sql, params);
  }).then((results) => {
    const user = results.rows[0];
    req.user = user;
    res.json(user);
  }).catch((error) => {
    console.error('SIGN UP ERROR', error);
    res.json({ error });
  })
    .then(() => {
      client.end();
    });
}, passport.authenticate('local', {
  session: false,
}));

router.post('/logout', (req, res) => {
  console.log('logging out');
  req.logout();
  // res.redirect('/');
});

module.exports = router;