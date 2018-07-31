import React from 'react';
import ReactDOM from 'react-dom';
import {Button,notification} from 'antd';

export default class GradeTable extends React.Component{
	constructor(props){
		super(props);

	}
	openNotification=(msg)=>{
		notification.open({
        message: noteMsg.message,
        description:noteMsg.description
        });
	}
	handleSubmit=()=>{
		//const stateData=this.state.gradeData;
		const perform=this._performInput.value;
		const basic=ReactDOM.findDOMNode(this._basic).value;
		const expression=ReactDOM.findDOMNode(this._expression).value;
		const reseach=ReactDOM.findDOMNode(this._reseach).value;
		const addall=Number(perform)+Number(basic)+Number(expression)+Number(reseach);

		const stateData={
			perform:perform,
			basic:basic,
			expression:expression,
			reseach:reseach,
			addall:addall
		}

		const basicData={
			stdName:this.props.stdName,
			stdNum:this.props.stdNum,
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
	handleCancle=()=>{
		this.props.history.push('/user/CurrentExam');
	}
	render(){
		const stdInfo=this.props.stdInfo;
		const stdData=this.props.stdData;
		return(
			<div style={{width:'80%',margin:'auto'}}>
			<form action="/save/stdGrade" method="post">
			<table className="tablecls">
			<thead>
			<tr>
				<th colSpan='5'>{stdInfo.stdName}	{stdInfo.stdNum}</th>
			</tr>
			<tr>
			   <th>表现能力</th>
			   <th>基础知识</th>
			   <th>表述能力</th>
			   <th>科研能力</th>
			   <th>合计</th>
			</tr>
			</thead>
			<tbody>
			   <tr>
			      <td><input name="perform" type="text" ref={performInput=>this._performInput=performInput}/></td>
			      <td><input name="basic" type="text" ref={basic=>this._basic=basic}/></td>
			      <td><input name="expression" type="text" ref={expression=>this._expression=expression}/></td>
			      <td><input name="reseach" type="text" ref={reseach=>this._reseach=reseach}/></td>
			      <td><input name="addall" type="text" ref={addall=>this._addall=addall}/></td>
			   </tr>
			</tbody>
			</table>
			<Button onClick={this.handleCancle}>返回</Button>
			<Button onClick={this.handleSubmit}>提交</Button>
			</form>
			</div>
			);
	}
}