// @flow
const express = require('express');

const router = express.Router();

const User = require('../models/user-model');

router.post('/updateLevel', (req, res) => {
  console.log('[updateLevel]', req.body);
  User.findById(req.body.userId, (err, user) => {
    // TO DO : update user schema with data coming from front end
    console.log('[uex', (user));
    if (!err) { res.json({ status: 'Success' }); }
  });
});
module.exports = router;
