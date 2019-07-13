// @flow
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const GitHubStrategy = require('passport-github2');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user-model');
require('dotenv').config();

const googleCredentials = {
  callbackURL: '/auth/google/success',
  clientID: process.env.google_client_id,
  clientSecret: process.env.google_client_secret,
};

passport.serializeUser((user, done) => {
  done(null, user.id); // mongoDB ID
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user.id); // mongoDB ID
  });
});

passport.use(
  new GoogleStrategy(
    googleCredentials,
    (accesToken, refreshToken, profile, done) => {
      // check if user exisits already
      User.findOne({ googleID: profile.id }).then((currentUser) => {
        if (currentUser) {
          // already has user
          console.log('user is: ', currentUser);
          done(null, currentUser);
        } else {
          // if not create new User
          new User({
            username: profile.displayName,
            googleID: profile.id,
          })
            .save()
            .then((newUser) => {
              console.log('user', newUser);
              done(null, newUser);
            });
        }
      });
    },
  ),
);

passport.use(
  new LocalStrategy(((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  })),
);

// passport.use() LinkedIn Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.github_client_id,
      clientSecret: process.env.github_client_secret,
      callbackURL: 'http://localhost:3000/login/github/success',
    },
    ((accessToken, refreshToken, profile, done) => {
      User.findOrCreate({ githubId: profile.id }, (err, user) => done(err, user));
    }),
  ),
);

// passport.use() Github Strategy
