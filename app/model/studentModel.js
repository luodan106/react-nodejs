const studentSchema=require('./schema/studentSchema');
const mongoose=require('mongoose');

const studentModel=mongoose.model('student',studentSchema);

module.exports=studentModel;
