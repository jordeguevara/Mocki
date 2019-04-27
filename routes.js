const express = require('express');

const router = express.Router();

const loginRoutes = require('./controllers/login');
const authRoutes = require('./controllers/auth');

router.use('/auth',authRoutes);
router.use('/login',loginRoutes);


module.exports = router;