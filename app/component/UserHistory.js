import React from 'react';
import {Table} from 'antd';

export default class UserHistory extends React.Component{
	constructor(props){
		super(props);
		this.username=localStorage.getItem('username');
		this.stdData=[];
		this.fetchData=this.fetchData.bind(this);
		this.state={
			gradeData:[]
		}
	}

	componentDidMount(){
		this.fetchData();
	}

	fetchData(){
		const userName=this.username;
		fetch('/gettechgrade?username='+userName+'',{
			method:'get'
		})
		.then((response)=>{
			return response.json();
		})
		.then((data)=>{
			if(data.msg.length>0){
	        this.stdData=[];
			data.msg.map((value,index)=>{
				let std={
					key:index,
					stdName:value.stdName,
                    stdNum:value.stdNum,
                    perform:value.perform,
                    basic:value.basic,
                    expression:value.expression,
                    reseach:value.reseach,
                    addall:value.addall
				}
				this.stdData.push(std);
			})
			this.setState({
				gradeData:this.stdData
			})
		}
		})
		.catch((err)=>{
			console.log(err);
		})
	}
	render(){
		const columns=[{
	      title:'学生姓名',
	      dataIndex:'stdName'
        },
        {
          title:'学生考号',
	      dataIndex:'stdNum'
        },{
	      title:'表现力',
	      dataIndex:'perform'
        },{
	      title:'基础知识',
	      dataIndex:'basic'
        },{
	      title:'表达能力',
	      dataIndex:'expression'
        },{
	      title:'科研能力',
	      dataIndex:'reseach'
        },{
	      title:'合计',
	      dataIndex:'addall'
        }]

		return(
			<Table columns={columns} dataSource={this.state.gradeData}/>
			);
	}
}