// @flow
const express = require('express');

const router = express.Router();

const User = require('../models/user-model');

router.post('/updateLevel', (req, res) => {
  console.log('[updateLevel]', req.body);

  const conditions = {
    _id: req.body.userId,
  };
  const update = {
    quiz: [1.5, 3.75, 2.3, 4.4],
    showModal: true,
    score: 11.95,
    level: 2,
    userId: '',
    firstTimeUser: false,
  };
  User.findOneAndUpdate(conditions, update, (error, result) => {
    if (error) {
      // handle error
    } else {
      console.log(result);
    }
  });
  // User.findById(req.body.userId, (err, user) => {
  //   if (err) {console.error(err)};
  //   // TO DO : update user schema with data coming from front end
  //   console.log('[uex', (user));


  if (!err) { res.json({ status: 'Success' }); }
  // });
});
module.exports = router;
