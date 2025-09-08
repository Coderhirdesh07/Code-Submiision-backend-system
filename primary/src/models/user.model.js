const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
{



}
,{timeStamps:true});

const User = mongoose.model('User',userSchema);
module.exports = User;