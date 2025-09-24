const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  submissions: {
    type: mongoose.Types.ObjectId,
    ref: 'Submission',
  },
});

async function generateAccessToken(email) {
  const accessToken = await jwt.sign(
    { email: email, username: username },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: '1d' }
  );
  return accessToken;
}

async function comparePassword(password) {
  const isPasswordCorrect = await bcrypt.compare(password, this.password);
  return isPasswordCorrect;
}

async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

const User = mongoose.model('User', userSchema);
module.exports = User;
