import React from 'react';
import {Table,Button,Modal,notification} from 'antd';
import InputMulSelect from './InputMulSelect';
import AddEditModal from './AddEditModal';

let selValue=[];
let selectedRowKeys=[];

let stdData=[];
export default class AdminSettingExam extends React.Component{
	constructor(props){
		super(props);
		this.state={
			data:[],
			addData:{
				stdName:'',
				techName:'',
				stdNum:'',
				roomNum:''
			},
			defaultData:{
			},
			rowSelectionKey:[],
			visible:false,
			title:"添加人员信息",
			selVisible:false,
			inputFocus:false,
			selOpts:false,
			checkState:[],
			teachOpts:selValue,
			defaultValue:{},
		}
		this.fetchData=this.fetchData.bind(this);
		this.clickAdd=this.clickAdd.bind(this);
		this.deleteData=this.deleteData.bind(this);
		this.handleOk=this.handleOk.bind(this);
		this.handleCancel=this.handleCancel.bind(this);
		this.handleFocus=this.handleFocus.bind(this);
		this.handleblur=this.handleblur.bind(this);
		this.handleChange=this.handleChange.bind(this);

        this.openNotification=this.openNotification.bind(this);
        this.editStdInfo=this.editStdInfo.bind(this);
	}
	componentDidMount(){
		this.fetchData();
	}
	fetchData(){
		 this.setState({
        rowSelectionKey:[],
        visible:false,
        addData:{
				stdName:'',
				techName:'',
				stdNum:'',
				roomNum:''
			}
      })
		 //获得所有学生数据显示
		fetch('/getstddata',{
			method:'get'
		})
		.then((response)=>{
			return response.json();
		})
		.then((data)=>{
			console.log(data.msg);
			stdData=[];
			const alldata=data.msg;
			if(alldata.stdData.length>0){
			alldata.stdData.map((value,index)=>{
				let std={
					key:index,
					stdName:value.stdName,
					techName:value.techName,
				    stdNum:value.stdNum,
				    roomNum:value.roomNum
				}
				stdData.push(std);
			})
		}
		//获得所有老师选择列表
			const techOpts=alldata.techData;
			selValue=[];
			techOpts.map((value,index)=>{
				selValue.push(value.teacherName);
			})
			console.log("selValue:"+selValue);
			this.setState({
				data:stdData,
				teachOpts:selValue
			})
		})
		.catch((err)=>{
			console.log(err);
		})
	}
	clickAdd(){
		const checkState=[];
		for(let i=0;i<selValue.length;i++){
			checkState.push(false);
		}
		this.setState({
			visible:true,
			defaultChecked:checkState,
			addData:{
				stdName:'',
				techName:'',
				stdNum:'',
				roomNum:''
			},
			title:"添加人员信息"
		},
		 ()=>{this.props.history.push({pathname:'/admin/AddExam/add',query:{value:this.state}})}
		)

	}
	deleteData(){

	}
	editStdInfo(e){
		const target=e.target;
		const trnode=target.parentNode.parentNode;
		const rowIndex=trnode.rowIndex;
		//获得编辑数据
		const editRow=stdData[rowIndex-1];
		this.state.addData.stdName=editRow.stdName;
		this.state.addData.techName=editRow.techName;
		this.state.addData.stdNum=editRow.stdNum;
		this.state.addData.roomNum=editRow.roomNum;
		const addData=this.state.addData;
		const checkState=[];
		for(let i=0;i<selValue.length;i++){
			checkState.push(false);
		}
		let techNameArr=editRow.techName[0].split(';');
		techNameArr.pop();
		console.log("checkState:"+techNameArr);
		for(let i=0;i<techNameArr.length;i++){
			const num=this.state.teachOpts.indexOf(techNameArr[i]);
			checkState[num]=true;
		}
		console.log("checkState:"+checkState);
		this.setState({
			visible:true,
			defaultChecked:checkState,
			addData:addData,
			title:"编辑人员信息"
		},
		 ()=>{this.props.history.push({pathname:'/admin/AddExam/edit',query:{value:this.state}})}
		)

	}
	handleOk(){
		const addData=this.state.addData;
		let openmsg={};
		fetch('/save/stdInfo',{
			method:'post',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify(addData)
		})
		.then((response)=>{
			return response.json();
		})
		.then((data)=>{
			console.log(data.msg);
			if(data.msg==="保存成功"){
				openmsg={
					 message: '保存成功',
                     description:''
				}
				this.fetchData();
			}
			else if(data.msg==="已有该学生信息"){
				openmsg={
					 message: '已有该学生信息',
                     description:''
				}
			}
			else{
				openmsg={
					 message: '保存失败',
                     description:''
				}
			}
			this.openNotification(openmsg);
		})
		.catch((err)=>{
			console.log(err);

		})
	}
	handleChange(e){
		const target=e.target;
		const name=target.name;
		const value=target.value;
		this.state.addData[name]=value;
		const addData=this.state.addData;
		this.setState({
			addData:addData
		})
	}
	handleCancel(){
		this.setState({
			visible:false,
			addData:{
				stdName:'',
				techName:'',
				stdNum:'',
				roomNum:''
			}
		})
	}
	handleFocus(e){
		const target=e.target;
		const name=target.name;
		if(name==="selinput"||name==="techName")
		{
		const checkState=this.state.checkState;
		if(name==="selinput"){
		  const value=target.value;
		  const checked=target.checked;
		  checkState[value]=checked;
		}

		this.setState({
			selVisible:true,
			checkState:checkState
		},()=>{
			let cState=this.state.checkState;
				this.state.addData.techName="";
			for(let i=0;i<cState.length;i++){
				if(cState[i]){
					this.state.addData.techName+=selValue[i]+";";
				}
			}

			const addData=this.state.addData;
			this.setState({
				addData:addData
			})
		})
	}
	else{
		this.setState({
			selVisible:false
		})
	}
	}
	handleblur(e){
		this.setState({
			selVisible:false
		})
	}
	openNotification(noteMsg){
		notification.open({
        message: noteMsg.message,
        description:noteMsg.description
        });
	}
	render(){
	    const columns=[{
	      title:'学生姓名',
	      dataIndex:'stdName'
        },
        {
          title:'监考老师',
	      dataIndex:'techName'
        },{
	      title:'学生考号',
	      dataIndex:'stdNum'
        },{
	      title:'考场号',
	      dataIndex:'roomNum'
        },{
	      title:'操作',
	      render:()=><a  onClick={this.editStdInfo}>编辑</a> 
        }]

        let selectedRow=[];

		const state=this.state;
		
		selectedRowKeys=state.rowSelectionKey;
		const rowSelection={
			selectedRowKeys,
			onChange:(selectedRowKeys,selectedRows)=>{
				selectedRow=selectedRows;
				this.setState({
					rowSelectionKey:selectedRowKeys
				})
			}
		}
		const visible=this.state.selVisible?'block':'none';
		return(
		<div onClick={this.handleFocus}>
		<Button type="primary" style={{marginLeft:'75%',marginBottom:'8px'}} onClick={this.clickAdd}>添加</Button>
        <Button type="primary" style={{marginLeft:'1%',marginBottom:'8px'}} onClick={this.deleteData}>删除</Button>
       
		<div style={{width:'80%',margin:"40px auto"}}>
		<Table rowSelection={rowSelection} columns={columns} dataSource={state.data}/>
		</div>
		</div>
			)
		
	}
}