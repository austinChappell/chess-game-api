const bcrypt = require('bcryptjs');
const { Client } = require('pg');

const dataStore = require('../assets/store');

const { dbConfig } = dataStore;

const checkPassword = function (password, passwordHash) {
  return bcrypt.compareSync(password, passwordHash);
};

const checkUser = function (email, password, done) {
  console.log('CHECK USER FUNCTION RUNNING', email, password);
  const client = new Client(dbConfig);

  client.connect().then(() => {
    const sql = 'SELECT * FROM users WHERE email = $1';
    const params = [email];

    return client.query(sql, params);
  }).then((results) => {
    console.log('email results', results.rows);
    const user = results.rows[0];

    if (user && checkPassword(password, user.password_hash)) {
      console.log('Should be a successful login');
      done(null, user);
    } else {
      console.log('The user probably entered the incorrect password');
      done(null, false);
    }
  });
};

module.exports = { checkUser };