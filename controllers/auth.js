/* eslint-disable no-underscore-dangle */
// @flow
const express = require('express');

const router = express.Router();
// const passport = require('passport');
const passport = require('passport');

// console.log(passport);

const User = require('../models/user-model');

const signUpUserService = async (userData) => {
  let user;
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

// const loginAuthenticatorService = async (userData) => {
//   const answer = async () => {
//     const isFound = await User.findOne({ username: userData.email }).then(
//       (user) => {
//         if (user) {
//           return true;
//         }
//         return false;
//       },
//     );
//     return isFound;
//   };
//   const ans = await answer();
//   return ans;
// };

// router.get('/logout', (req, res) => {
//   req.logout();
//   res.status(301).redirect('http://localhost:3000/login');
// });

// router.post('/login', async (req, res) => {
//   const userStatus = await loginAuthenticatorService(req.body);
//   if (userStatus) res.send({ status: 'S' });
//   else res.send({ status: 'F' });
// });

// router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// router.get(
//   '/google/success',
//   passport.authenticate('google', {
//     successRedirect: 'http://localhost:3000/dashboard',
//     failureRedirect: 'http://localhost:3000/login',
//   }),
// );

// const checkBody = (params, req, res, next) => {
//   params.forEach((element) => {
//     if (!element) {
//       const error = new Error(`Param ${element}is missing`);
//       res.json(error);
//     }
//     next();
//   });
// };

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


// router.get(
//   '/auth/github',
//   passport.authenticate('github', { scope: ['user:email'] }),
// );

// router.get(
//   '/auth/github/callback',
//   passport.authenticate('github', { failureRedirect: '/login' }),
//   (req, res) => {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   },
// );

module.exports = router;
