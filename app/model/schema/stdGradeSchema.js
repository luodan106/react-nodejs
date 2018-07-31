const mongoose=require('mongoose');

const stdGradeSchema=new mongoose.Schema({
	stdName:{
		type:String
	},
	stdNum:{
		type:String
	},
	techName:{
		type:Array
	},
	gradeData:{
		type:Array
	}
});

module.exports=stdGradeSchema;