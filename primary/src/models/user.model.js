const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  submission: {
    type: String,
  },
});

async function generateAccessToken() {
  const accessToken = await jwt.sign(
    { _id: _id, email: email },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: '1d' }
  );
  return accessToken;
}

async function comparePassword(password) {
  const isPasswordCorrect = await bcrypt.compare(password, this.password);
  return isPasswordCorrect;
}

const User = mongoose.model('User', userSchema);
module.exports = User;
