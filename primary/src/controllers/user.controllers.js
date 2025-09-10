const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieparser = require('cookie-parser');

async function handleUserRegistrationRoute(request,response){
    const {firstname,lastname,email,password} = request.body;
    if(!firstname || !lastname || !email || !password){
        return response.status(400).json({message:'firstName or lastname or email or password missing'});
    }
    const user = await User.findOne({email:email});
    if(user) return response.status(200).json({message:'User already exist'});

    const newUser = User.save({firstname:firstname,lastname:lastname,email:email,password});
    return response.status(200).json({message:'User registerd successfully'});
}


async function handleUserLoginRoute(request,response){
  const {email,password} = request.body;
  if(!email || !password) return response.status(400).json({message:'email or password invalid'});

  const isPasswordCorrect = await bcrypt(password,this,password);
  if(isPasswordCorrect) return response.status(400).json({message:'Password is incorrect'});

  return response.status(200).json({message:'User succesfully login'});
}


async function handleUserLogoutRoute(request,response){
    

}



module.exports = {handleUserRegistrationRoute,handleUserLoginRoute,handleUserLogoutRoute};