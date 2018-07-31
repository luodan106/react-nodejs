const mongoose=require('mongoose');
let userSchema=require('./schema/userSchema');

let userModel=mongoose.model('user',userSchema);
module.exports=userModel;