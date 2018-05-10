const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

function configure(passport) {

  const strategyFunc = function (username, password, done) {

    User.authenticate(username, password, function (err, user) {
      if (err) {
        console.error('Local Strategy - Error trying to authenticate.')
        done(err)
      } else if (user) {
        console.log('Local Strategy - Success', user)
        done(null, user)
      } else {
        console.log('Local Stategy - Could not find user')
        done(null, false)
      }
    })

  }

  passport.use(new LocalStrategy(strategyFunc))

  passport.serializeUser(function (user, done) {
    console.log('SERIALIZE USER', user)
    done(null, user.id)
  })

  passport.deserializeUser(function (id, done) {
    console.log('ABOUT TO DESERIALIZE', id)
    User.findById(id, function (err, user) {
      console.log('DESERIALIZE USER', user)
      done(err, user)
    })
  })
}

module.exports = {
  configure
}