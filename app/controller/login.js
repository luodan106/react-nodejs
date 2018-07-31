const userModel=require("../model/userModel");

exports.logOn=(req,res)=>{
	const userObj=req.body;
	userModel.findOne({username:userObj.username},(err,user)=>{
		if(err){
			console.log(err);
			res.send({msg:err});
		}
		if(user){
			console.log("user:"+user);
			res.locals.user=userObj;
			res.send({msg:user});
		}
		else{
			res.send({msg:"该用户未注册"});
		}
	})
}