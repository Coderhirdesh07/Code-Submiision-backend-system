const express = require('express');
const router = express.Router();
const {
  handleUserRegistrationRoute,
  handleUserLoginRoute,
  handleUserLogoutRoute,
} = require('../controllers/user.controllers.js');
const { verifyJwt } = require('../middleware/auth.middleware.js');

// user registration route
router.post('/register', handleUserRegistrationRoute);

// user login and logout route
router.post('/login', verifyJwt, handleUserLoginRoute);
router.post('/logout', verifyJwt, handleUserLogoutRoute);

// update info routes

// view profile routes

module.exports = router;
