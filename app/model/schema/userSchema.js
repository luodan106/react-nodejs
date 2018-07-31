const mongoose=require('mongoose');
const bcryptjs=require('bcryptjs');

let SALT_WORK_FACTOR=10;

let userSchema=new mongoose.Schema({
	username:{
		type:String,
	},
	password:{
		type:String
	},
	idauthority:{
		type:String
	}
});

/*userSchema.pre('save',(next)=>{
	let user=this;
	console.log("password:"+JSON.stringify(this));
	bcryptjs.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
		if(err){
			return next(err);
		}
		bcryptjs.hash(user.password,salt,(err,hash)=>{

			if(err){
				return next(err);
			}

			user.password=hash;
			next();
		})
	})
});*/


module.exports=userSchema;

