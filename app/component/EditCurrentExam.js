import React from 'react';
import {Button,notification} from 'antd';
import GradeTable from './GradeTable';

export default class EditCurrentExam extends React.Component{
	constructor(props){
		super(props);
		this.state={
			gradeData:{
				perform:'',
				basic:'',
				expression:'',
				reseach:'',
				addall:''
			}
		}
		this.handleCancle=this.handleCancle.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
		this.handleChange=this.handleChange.bind(this);
        this.openNotification=this.openNotification.bind(this);
	}
	openNotification(noteMsg){
		notification.open({
        message: noteMsg.message,
        description:noteMsg.description
        });
	}
	handleCancle(){
		this.props.history.push('/user/CurrentExam');
	}
	handleSubmit(){
		const stateData=this.state.gradeData;
		const basicData={
			stdName:this.props.location.data.stdName,
			stdNum:this.props.location.data.stdNum,
			techName:localStorage.getItem('username'),
			gradeData:stateData
		}
		fetch('/save/stdGrade',{
			method:'post',
			headers:{
			'Content-Type':'application/json'
	     	},
	    	body:JSON.stringify(basicData)
		})
		.then((response)=>{
		   return response.json();
		    console.log("response:"+data);
		})
		.then((data)=>{
		    if(data.msg==="保存成功"){
		    	const msg={
		    		message:'保存成功',
		    		description:''
		    	}
		    	this.openNotification(msg);
		    	this.props.history.push('/user/CurrentExam');
		    }
		})
		.catch((err)=>{
			console.log("err1:"+err);
		})
	}
	handleChange(e){
       const target=e.target;
       const name=target.name;
       const value=target.value;
       const stateData=this.state.gradeData;
       stateData[name]=value;
       stateData.addall=Number(stateData.perform)+Number(stateData.basic)+Number(stateData.expression)+Number(stateData.reseach);
       this.setState({
       	gradeData:stateData
       });

	}
	render(){
		const editdata=this.props.location.data;
		const stdInfo={
			stdName:editdata.stdName,
			stdNum:editdata.stdNum
		}
		return(
			<div style={{width:'80%',margin:'auto'}}>
			<GradeTable 
			 stdInfo={stdInfo}
			 stdData={this.state.gradeData} 
			 onChange={this.handleChange}
			 stdNum={this.props.location.data.stdNum}
			 stdName={this.props.location.data.stdName}
			 />
			<div>
			</div>
			</div>
			);
	}
}