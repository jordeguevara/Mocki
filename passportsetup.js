// @flow

const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const Users = require('./models/user-model');

const findOrCreateUser = (profile, done) => {
  Users.find({ GitHubID: profile.id }, (err, docs) => {
    const userFound = docs;
    if (!userFound || userFound.length === 0) {
      console.log('no %s found, creating user ', profile.id);
      const githubUser = new Users({
        username: profile.username,
        level: null,
        firstTimeUser: true,
        GitHubID: profile.id,
      });

      githubUser.save((err, results) => {
        if (err) { console.error(err); }
        done(null, results);
      });
    } else {
      // TO DO: Should not be array should be an object
      done(null, userFound[0]._id);
    }
  });
};


module.exports = (passport) => {
  passport.serializeUser((user, cb) => cb(null, user.id));

  passport.deserializeUser((id, cb) => {
    Users.findById(id, (err, user) => {
      if (err) { return cb(err); }
      return cb(null, user);
    });
  });


  passport.use(new LocalStrategy(
    ((username, password, done) => {
      Users.findOne({ username }, (err, user) => {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (user.password !== password) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        return done(null, user._id);
      });
    }),
  ));

  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3001/auth/github/callback',
  },
  ((accessToken, refreshToken, profile, done) => {
    findOrCreateUser(profile, done);
  })));
};
