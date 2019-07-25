// @flow
const express = require('express');

const router = express.Router();
const User = require('../models/user-model');

router.get('/:id', (req, res) => {
  res.send({ data: 'success' });
});

router.post('/', (req, res) => {
  const { body } = req;
  res.set('Content-Type', 'application/json');
  res.send(JSON.stringify(body));
});

module.exports = router;
