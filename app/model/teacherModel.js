const mongoose=require('mongoose');
const teacherSchema=require('./schema/teacherSchema');

const teacherModel=mongoose.model('teacher',teacherSchema);

module.exports=teacherModel;