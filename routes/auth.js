const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/user')

router.get('/login', (req, res) => {
  res.render('admin/login', { user: req.user })
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/admin/',
  failureRedirect: '/admin/login'
}))

router.get('/register', (req, res) => {
  console.log('PROCESS ENV FROM REGISTER ROUTE', process.env)
  res.render('admin/register')
})

router.post('/register', (req, res, next) => {
  const developer = process.env.DEVELOPER_ACCT
  const client = process.env.CLIENT_ACCT
  if (req.body.username === developer || req.body.username === client) {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    })
    user.save((err) => {
      if (err) {
        console.error('There was an error saving the user', err)
      }
      next()
    })
  } else {
    res.send('YOU ARE NOT AUTHORIZED TO CREATE AN ACCOUNT')
  }
}, passport.authenticate('local', {
  successRedirect: '/admin/'
}))

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/admin')
})

module.exports = router;