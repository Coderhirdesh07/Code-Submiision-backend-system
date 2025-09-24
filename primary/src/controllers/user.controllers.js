const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const cookie = require('cookie-parser');
const { redisConnection } = require('../database/redis.database.js');

async function handleUserRegistrationRoute(request, response) {
  const { firstname, lastname, username, email, password } = request.body;
  if (!firstname || !lastname || !username || !email || !password) {
    return response
      .status(400)
      .json({ message: 'firstName or lastname or username or email or password missing' });
  }
  const user = await User.findOne({ email: email });

  if (user) return response.status(200).json({ message: 'User already exist' });

  const encryptPassword = await User.hashPassword(password);

  const newUser = new User({
    firstname: firstname,
    lastname: lastname,
    username: username,
    email: email,
    password: encryptPassword,
  });
  await newUser.save();
  return response.status(200).json({ message: 'User registerd successfully' });
}

async function handleUserLoginRoute(request, response) {
  const { email, password } = request.body;
  const redisDb = await redisConnection();
  if (!email || !password)
    return response.status(400).json({ message: 'email or password invalid' });

  const isEmailExist = await User.findOne({ email });
  if (!isEmailExist) return response.status(400).json({ message: 'Email does not exist' });

  const isPasswordCorrect = await bcrypt(password, this.password);
  if (isPasswordCorrect) return response.status(400).json({ message: 'Password is incorrect' });

  const accessToken = await User.generateAccessToken(email);
  const constructedKey = `${accessToken} + ":" + ${isPasswordCorrect}`;
  await redisDb.SET(email, constructedKey);
  return response
    .status(200)
    .cookie('token', accessToken)
    .json({ message: 'User succesfully login' });
}
async function handleUserLoginRoutes(request, response) {
  const { email, password } = request.body;

  if (!email || !password)
    return response.status(400).json({ message: 'Email or password missing' });
  // find email in redis
  const redisDb = await redisConnection();

  const cachedKey = `user:${email}`;
  const isEmailSessionExist = await redisDb.GET(cachedKey);
  let userData;
  if (isEmailSessionExist) {
    userData = JSON.parse(isEmailSessionExist);
    console.log('data cached');
  } else {
    userData = await User.findOne({ email: email });
    if (!userData) return response.status(400).json({ message: 'Email does not exist' });
  }

  const isPasswordCorrect = await bcrypt.compare(password, userData.password);
  if (!isPasswordCorrect) return response.status(400).json({ message: 'Password is invalid' });

  const token = User.generateAccessToken(email);

  await redisDb.SET(`user:${email}`, JSON.stringify(user));

  return response.status(200).cookie('token', token).json({ message: 'Login Succesfull' });
}

async function handleUserLogoutRoute(request, response) {
  // TODO needed to correct it
  const redisDb = redisConnection();
  const { email } = request.body;
  await redisDb.DEL(email);
  return response.status(200).clearCookie().json({ message: 'User Logout Successful' });
}

module.exports = {
  handleUserRegistrationRoute,
  handleUserLoginRoute,
  handleUserLogoutRoute,
};
