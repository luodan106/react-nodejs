const teacherModel=require('../model/teacherModel');
const studentModel=require('../model/studentModel');
const stdgradeModel=require('../model/stdgradeModel');

exports.getData=(req,res)=>{
    teacherModel.find({},(err,data)=>{
    	if(err){
    		console.log(err);
    		res.send({msg:err});
    	}
    	else{
    		res.send({msg:data});
    	}
    })
}

exports.saveTechInfo=(req,res)=>{
    const techData=req.body;
    teacherModel.findOne({teacherName:techData.workNum},(err,data)=>{
        if(err){
            console.log(err);
            res.send({msg:err});
        }
        else if(data){
            res.send({msg:"用户已存在"});
        }
        else{
            let newTech=new teacherModel(techData);
            newTech.save((err,data)=>{
                if(err){
                    res.send({msg:err});
                }
                else{
                    res.send({msg:"添加成功"});
                }
            })
        }
    })
}

exports.deleteTechInfo=(req,res)=>{
    const delCondition=req.body.data;
    teacherModel.remove({"$or":delCondition},(err)=>{
        if(err){
            console.log(err);
            res.send({msg:err});

        }
        else{
            res.send({msg:"删除成功"});
        }
    })
}
exports.getStdData=(req,res)=>{
    let senddata={};
    studentModel.find({},(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            data.map((value,index)=>{
                if(value.techName[0]==""){
                    data.splice(index,1);
                }
            })
            senddata.stdData=data;

            teacherModel.find({},(err,techdata)=>{
              if(err){
                res.send({msg:err});
               }
              else{
                senddata.techData=techdata;
                res.send({msg:senddata});
        }
    })
        }
    })
}

exports.saveStdInfo=(req,res)=>{
    const stddata=req.body;
    studentModel.find({stdNum:stddata.stdNum},(err,user)=>{
        if(err){
            console.log("err:"+err);
            res.send({msg:err});
        }
        /*else if(user!==""){
            console.log("user:"+user);
            res.send({msg:"已有该学生信息"});
        }*/
        else{
            let newstd=new studentModel(stddata);
            newstd.save((err,data)=>{
                if(err){
                    console.log("err:"+err);
                    res.send({msg:err});
                }
                else{
                    res.send({msg:"保存成功"});
                }
            })
        }
    })
}

exports.updateStdInfo=(req,res)=>{
  console.log(req.body);
  const stdData=req.body;
  studentModel.findOneAndUpdate({stdNum:stdData.stdNum},{stdName:stdData.stdName,techName:stdData.techName,stdNum:stdData.stdNum,roomNum:stdData.roomNum},(err,user)=>{
    if(err){
        console.log(err);
        res.send({msg:err});
    }
    else{
        console.log("success:"+user);
        res.send({msg:"修改成功"});
    }
  })
}

exports.getTechData=(req,res)=>{
    console.log(req.query.techname);
    studentModel.find({techName:{$regex:req.query.techname}},(err,user)=>{
        if(err){
            console.log(err);
            res.send({msg:err})
        }
        else{
            console.log("user:"+user);
            res.send({msg:user});
        }
    })
}

exports.saveStdGrade=(req,res)=>{
    const stdgrade=req.body;
    const newgrade=new stdgradeModel(stdgrade);
    console.log("stdgrade:"+JSON.stringify(stdgrade));
    console.log("newgrade:"+JSON.stringify(newgrade));
    stdgradeModel.findOne({stdNum:stdgrade.stdNum},(err,user)=>{
        if(err){
            console.log(err);
            res.send({msg:err});
        }
        else if(user||user!=null){
            console.log("exist");
            user.techName.push(stdgrade.techName);
            user.gradeData.push(stdgrade.gradeData);
            user.save((err,savedata)=>{
                if(err){
                    console.log(err);
                    res.send({msg:err});
                }
                else{

                studentModel.findOne({stdNum:stdgrade.stdNum},(err,data)=>{
                if(err){
                    console.log("err:"+err);
                    res.send({msg:err});
                }
                else{
                        let techName=data.techName[0];
                        if(data.techName[0].indexOf(stdgrade.techName)>-1){
                            console.log("replace:"+stdgrade.techName+";");
                            techName=data.techName[0].replace(stdgrade.techName+";",'');
                            data.techName[0]=techName;
                            console.log("techName:"+techName);
                        }
                        console.log("data:"+data);
                        //delete data._id;
                        console.log("data:"+data);
                        studentModel.update({stdNum:stdgrade.stdNum},data,(err,msg)=>{
                            if(err){
                                console.log(err);
                                res.send({msg:err});
                            }
                            else{
                                console.log("msg:"+msg);
                                res.send({msg:"保存成功"});
                            }
                        })
                    }
                })
                }
            })
        }
        else{
        console.log("user:"+JSON.stringify(user));
        newgrade.save((err,saveuser)=>{
        if(err){
            console.log("err:"+err);
            res.send(err);
           }
           else{

                studentModel.findOne({stdNum:stdgrade.stdNum},(err,data)=>{
                if(err){
                    console.log("err:"+err);
                    res.send({msg:err});
                }
                else{
                        let techName=data.techName[0];
                        if(data.techName[0].indexOf(stdgrade.techName)>-1){
                            console.log("replace:"+stdgrade.techName+";");
                            techName=data.techName[0].replace(stdgrade.techName+";",'');
                            data.techName[0]=techName;
                            console.log("techName:"+techName);
                        }
                        //delete data._id;
                        console.log("data:"+data);
                        studentModel.update({stdNum:stdgrade.stdNum},data,(err,msg)=>{
                            if(err){
                                console.log(err);
                                res.send({msg:err});
                            }
                            else{
                                console.log("msg:"+msg);
                                res.send({msg:"保存成功"});
                            }
                        })
                    }
            })
           }
        })
        }


    })
}

exports.getTechGrade=(req,res)=>{
    const username=req.query.username;
    const techgrade=[];
    stdgradeModel.find({techName:username},(err,data)=>{
        if(err){
            console.log(err);
            res.send({msg:err});
        }
        else{
        data.map((value,index)=>{
        const num=value.techName.indexOf(username);
        const grade={
            stdName:value.stdName,
            stdNum:value.stdNum,
            perform:value.gradeData[num].perform,
            basic:value.gradeData[num].basic,
            expression:value.gradeData[num].expression,
            reseach:value.gradeData[num].reseach,
            addall:value.gradeData[num].addall
        };
        techgrade.push(grade);
    })
        res.send({msg:techgrade});
    }
    })
}
 exports.getAllgrade=(req,res)=>{
    stdgradeModel.find({},(err,data)=>{
        if(err){
            console.log("err:"+err);
            res.send({msg:err});
        }
        else{
            const gradeData=[];
            const rownum=[];
            if(data.length>0){
                data.map((value,index)=>{
                    if(index===0){
                    rownum.push(value.techName.length);
                }
                else{
                    rownum.push(value.techName.length+rownum[index-1]);
                }
                    value.techName.map((value1,index1)=>{
                        const grade={
                             key:index+index1,
                             stdName:value.stdName,
                             stdNum:value.stdNum,
                             techName:value.techName[index1],
                             addall:value.gradeData[index1].addall
                        };
                     gradeData.push(grade);
                    })
                
                })
            }
            res.send({msg:{gradeData:gradeData,rownum:rownum}});
        }
    })
 }