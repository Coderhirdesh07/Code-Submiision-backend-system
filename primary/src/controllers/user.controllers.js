const { User, hashPassword, comparePassword } = require('../models/user.model.js');
const { redisConnection } = require('../database/redis.database.js');
const ApiResponse = require('../utils/ApiResponse.js');
const ApiError = require('../utils/ApiError.js');
const jwt = require('jsonwebtoken');

async function handleUserRegistrationRoute(request, response) {
  const { firstname, lastname, email, password, role } = request.body;
  if (!firstname || !lastname || !email || !password || !role) {
    throw new ApiError(400, 'All fields are required', [
      'firstname,lastname,email,password, role is missing',
    ]);
  }
  const user = await User.findOne({ email: email });

  if (user) {
    throw new ApiError(400, 'User  already exist', ['A user with this email already exist']);
  }
  const encryptedPassword = await hashPassword(password);

  const newUser = new User({
    firstname,
    lastname,
    email,
    password: encryptedPassword,
    role: role,
  });
  await newUser.save();
  return response.status(200).json(new ApiResponse(200, newUser, 'User Registration Successfull'));
}

async function handleUserLoginRoute(request, response) {
  const { email, password } = request.body;
  const redisDb = await redisConnection();
  if (!email || !password) {
    throw new ApiError(400, 'Email or password invalid');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, 'User  Does not exist');
  }

  const isPasswordCorrect = await comparePassword(password, user.password);
  if (!isPasswordCorrect) {
    throw new ApiError(400, 'Password is Incorrect ');
  }

  const accessToken = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET_KEY
  );
  const contruct_key = `${accessToken}:${user.role}:${user.email}`;
  await redisDb.set(user._id.toString(), contruct_key, { Ex: 60 * 60 * 24 });

  return response
    .status(200)
    .cookie('token', accessToken, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    })
    .json(new ApiResponse(200, user, 'User Logged In Successfully'));
}

async function handleUserLogoutRoute(request, response) {
  const redisDb = await redisConnection();
  const { id } = request.body;
  await redisDb.del(id);
  return response
    .status(200)
    .clearCookie('token')
    .json(new ApiResponse(200, null, 'User Logout Success'));
}

async function handleUserInfo(request, response) {
  const { id } = request.body;
  if (!id) throw new ApiError(400, 'Id is not found');
  const userInfo = await User.findOne({ id });
  return response.status(200).json(new ApiResponse(200, userInfo, 'User Info found'));
}

module.exports = {
  handleUserRegistrationRoute,
  handleUserLoginRoute,
  handleUserLogoutRoute,
  handleUserInfo,
};
