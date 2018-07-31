const mongoose=require('mongoose');

let studentSchema=new mongoose.Schema({
	stdName:{
		type:String
	},
    techName:{
    	type:Array
    },
    stdNum:{
    	type:String
    },
	roomNum:{
		type:String
	}
})

module.exports=studentSchema;