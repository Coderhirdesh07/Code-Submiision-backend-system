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
  role: {
    type: String,
    enum: ['ADMIN', 'CONTRIBUTER', 'CANDIDATE'],
    default: 'CANDIDATE',
  },
});

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

async function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '1d' });
}

const User = mongoose.model('User', userSchema);
module.exports = { User, generateAccessToken, comparePassword, hashPassword };
