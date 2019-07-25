/* eslint-disable no-underscore-dangle */
// @flow
const express = require('express');

const router = express.Router();
const passport = require('passport');

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

// router.post('/login', async (req, res) => {
//   const userStatus = await loginAuthenticatorService(req.body);
//   if (userStatus) res.send({ status: 'S' });
//   else res.send({ status: 'F' });
// });

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

// GET /auth/github
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in GitHub authentication will involve redirecting
//   the user to github.com.  After authorization, GitHub will redirect the user
//   back to this application at /auth/github/callback
router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] }),
  (req, res) => {
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });

// GET /auth/github/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: 'http://localhost:3000/error' }),
  (req, res) => {
    console.log(req.user);
    console.log(req.session);
    res.redirect('http://localhost:3000/firstTime');
  });


router.get('/logout', (req, res) => {
  req.logout();
  console.log(req.user);
  console.log(req.session);
  res.redirect('http://localhost:3000/home');
});
module.exports = router;
