const express = require('express');
const router = express.Router();
const {handleUserRegistrationRoute,handleUserLoginRoute,handleUserLogoutRoute} = require('../controllers/user.controllers.js');

// user registration route
router.post('/register',handleUserRegistrationRoute);

// user login and logout route
router.post('/login',handleUserLoginRoute);
router.post('/logout',handleUserLogoutRoute);

// update info routes


// view profile routes



module.exports = router;