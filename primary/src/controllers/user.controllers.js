async function handleUserRegistrationRoute(request,response){
    const {firstname,lastname,username,email,password} = request.body;
    if(!firstname || !lastname || !username || !email || !password){
        return response.status(400).json({message:'firstName or lastname or username or email or password missing'});
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