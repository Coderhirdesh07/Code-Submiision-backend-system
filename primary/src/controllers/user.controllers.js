const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookie = require('cookie-parser');

// TODO needed to include logic for redis cache

async function handleUserRegistrationRoute(request, response) {
  const { firstname, lastname, email, password } = request.body;
  if (!firstname || !lastname || !email || !password) {
    return response
      .status(400)
      .json({ message: 'firstName or lastname or email or password missing' });
  }
  const user = await User.findOne({ email: email });
  if (user) return response.status(200).json({ message: 'User already exist' });

  const encryptPassword = await User.hashPassword(password);

  const newUser = User.save({
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: encryptPassword,
  });
  return response.status(200).json({ message: 'User registerd successfully' });
}

async function handleUserLoginRoute(request, response) {
  const { email, password } = request.body;
  if (!email || !password)
    return response.status(400).json({ message: 'email or password invalid' });

  const isEmailExist = await User.findOne({ email });
  if (!isEmailExist)
    return response.status(400).json({ message: 'Email does not exist' });

  const isPasswordCorrect = await bcrypt(password, this, password);
  if (isPasswordCorrect)
    return response.status(400).json({ message: 'Password is incorrect' });

  const accessToken = await User.generateAccessToken(email);

  return response
    .status(200)
    .cookie('token', accessToken)
    .json({ message: 'User succesfully login' });
}

async function handleUserLogoutRoute(request, response) {
  // TODO needed to correct it

  return response
    .status(200)
    .clearCookie()
    .json({ message: 'User Logout Successful' });
}

module.exports = {
  handleUserRegistrationRoute,
  handleUserLoginRoute,
  handleUserLogoutRoute,
};
