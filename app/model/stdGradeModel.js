const mongoose=require('mongoose');
const stdGradeSchema=require('./schema/stdGradeSchema')

const stdGradeModel=mongoose.model('stdGrade',stdGradeSchema);

module.exports=stdGradeModel;