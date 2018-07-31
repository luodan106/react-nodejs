const mongoose=require('mongoose');

let teacherSchema=new mongoose.Schema({
	teacherName:{
		type:String
	},
	institution:{
		type:String
	},
	workNum:{
		type:String
	}
});

module.exports=teacherSchema;