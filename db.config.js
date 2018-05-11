const {
  Client,
} = require('pg');

const initializeUsers = () => {
  const client = new Client();
  const sql = 'CREATE TABLE users(id int(11) NOT NULL auto_increment, username varchar(250) NOT NULL, password_hash varchar(250) NOT NULL, PRIMARY KEY (id), CONSTRAINT users_username_unique UNIQUE (username))';
  client.connect().then(() => {
    return client.query(sql)
  }).then(() => {
    console.log('SUCCESSFULLY CREATED TABLE');
  }).catch((err) => {
    console.error(err);
  }).then(() => {
    client.end();
  })
}

module.exports = {
  initializeUsers,
}