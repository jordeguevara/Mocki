const express = require('express');

const router = express.Router();

const loginRoutes = require('./controllers/login');

router.use('/login',loginRoutes )

module.exports = router;