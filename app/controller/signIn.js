const userModel=require("../model/userModel");

exports.signIn=(req,res)=>{
	const userObj=req.body;
	//res.send({msg:"添加成功"})
	userModel.findOne({username:userObj.username},(err,user)=>{
		if(err){
			console.log("err:"+err);
			res.send({msg:err});
		}
		else{
		if(user){
			res.send({msg:'用户名重复'});
		}
		else{
			let newUser=new userModel(userObj);

			newUser.save((err,user)=>{
				if(err){console.log("saveErr:"+err);
					res.send({msg:err});
				}
				else{
					res.send({msg:"注册成功"});
				}
			})
		}
	}
	});
}