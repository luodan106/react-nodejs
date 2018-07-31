import React from 'react';
import {Table} from 'antd';

let columns=[{
	      title:'学生姓名',
	      dataIndex:'stdName'
        },{
	      title:'学生考号',
	      dataIndex:'stdNum'
        },
        {
          title:'监考老师',
	      dataIndex:'techName'
        },{
	      title:'评分',
	      dataIndex:'addall'
        }];

export default class AdminHistory extends React.Component{
	constructor(props){
		super(props);
        this.fetchData=this.fetchData.bind(this);
        this.mergeRow=this.mergeRow.bind(this);
        this.state={
        	columns:[],
        	dataSource:[]
        }
	}
	componentDidMount(){
		this.fetchData();
	}
	mergeRow(rownum){
		columns[0].render=function(value,row,index){
			const obj={
				children:value,
				props:{}
			};
			for(let i=0;i<rownum.length;i++){
				if(i===0){
					if(index===0){
						obj.props.rowSpan=rownum[0];
					}
					else{
						for(let j=1;j<rownum[0];j++){
							if(index===j){
							obj.props.rowSpan=0;
						}
						}
					}
				}
				else{
					if(index===rownum[i]-1){
						obj.props.rowSpan=rownum[i];
					}
					else{
						for(let j=rownum[i];j<rownum[i];j++){
							if(index===j){
							obj.props.rowSpan=0;
						}
						}
					}
				}
			}
			return obj;
		}
		columns[1].render=function(value,row,index){
			const obj={
				children:value,
				props:{}
			};
			for(let i=0;i<rownum.length;i++){
				if(i===0){
					if(index===0){
						obj.props.rowSpan=rownum[0];
					}
					else{
						for(let j=1;j<rownum[0];j++){
							if(index===j){
							obj.props.rowSpan=0;
						}
						}
					}
				}
				else{
					if(index===rownum[i]-1){
						obj.props.rowSpan=rownum[i];
					}
					else{
						for(let j=rownum[i];j<rownum[i];j++){
							if(index===j){
							obj.props.rowSpan=0;
						}
						}
					}
				}
			}
			return obj;
		}
		this.setState({
			columns:columns
		})
	}
	fetchData(){
		fetch('/getallgrade',{
			method:'get'
		})
		.then((response)=>{
			return response.json();
		})
		.then((data)=>{
			console.log(data.msg);
			this.setState({
				dataSource:data.msg.gradeData
			})
			const rownum=data.msg.rownum;
			this.mergeRow(rownum);
		})
		.catch((err)=>{
			console.log(err);
		})
	}
	render(){
		return(
			<Table columns={this.state.columns} dataSource={this.state.dataSource}/>
			);

	}
}