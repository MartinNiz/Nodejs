const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('../models/Users')

passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  const user = await User.findOne({email: email});
  if (!user) {
    return done(null, false, {message: 'Not User found.'});
  } else {
    const match = await User.matchPassword({password});
    if (match) {
      return done(null, user)
    } else {
      return done(null, false, {message: 'Incorret Password.'});
    }
  }
}));


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByID(id, (err, user) => {
    done(err, user);
  });
})