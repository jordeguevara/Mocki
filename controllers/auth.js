/* eslint-disable no-underscore-dangle */
// @flow
const express = require('express');

const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const User = require('../models/user-model');

const signUpUserService = async (userData) => {
  let user;
  bcrypt.hash(userData.password, saltRounds, (err, hash) => {
    userData.password = hash;
  });

  const result = await User.findOne({
    username: userData.username,
    password: userData.password,
  });
  if (result) {
    // already has user
    console.log('USER EXISITS');
    // done(null, currentUser);
  } else {
    await new User({
      username: userData.username,
      password: userData.password,
      level: null,
      firstTimeUser: true,
    })
      .save()
      .then((newUser) => {
        user = {
          id: newUser._id,
          firstTime: newUser.firstTimeUser,
        };
        return user;
      });
  }
  return user;
};

router.post('/signUp', async (req, res) => {
  try {
    const newUserId = await signUpUserService(req.body);
    res.json({ message: 'Success', user: newUserId });
  } catch (error) {
    res.status(400).json({ message: 'Failure', user: null });
  }
});

router.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    res.json({ status: 'Authenticated', userId: req.user });
  });

router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] }),
  (req, res) => {
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: 'http://localhost:3000/error' }),
  (req, res) => {
    res.redirect('http://localhost:3000/firstTime');
  });


router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('http://localhost:3000/home');
});
module.exports = router;
