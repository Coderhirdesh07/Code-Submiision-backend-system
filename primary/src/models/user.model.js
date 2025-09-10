const mongoose = require('mongoose');
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  firstname:{
    type:String,
    require:true,
  },
  lastname:{
    type:String,
  },
  email:{
    type:String,
    require:true,
    unique:true,
  },
  password:{
    type:String,
    require:true,
  },
  submission:{
    type:String,
  },


});

const User = mongoose.model('User',userSchema);
module.exports = User;