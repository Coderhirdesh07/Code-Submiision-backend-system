const express = require('express');
const router = express.Router();
const {
  handleUserRegistrationRoute,
  handleUserLoginRoute,
  handleUserLogoutRoute,
} = require('../controllers/user.controllers.js');
const { verifyTokenWithRedis } = require('../middleware/auth.middleware.js');

// user registration route
router.post('/register', handleUserRegistrationRoute);

// user login and logout route
router.post('/login', verifyTokenWithRedis, handleUserLoginRoute);
router.post('/logout', verifyTokenWithRedis, handleUserLogoutRoute);

// update info routes

// view profile routes

module.exports = router;
