import InputMulSelect from './InputMulSelect';
import React from 'react';
import {Modal,Button,notification} from 'antd';


export default class AddEditModal extends React.Component{
	constructor(props){
		super(props);
		//const defaultData=this.props.value.defaultData;
		this.state={
			addData:{
				stdName:'',
				techName:'',
				stdNum:'',
				roomNum:''
			},
			checkState:[],
			visible:true,
			loading:false
		}
			this.setData=this.setData.bind(this);
			this.handlerChange=this.handlerChange.bind(this);
			this.handleCancel=this.handleCancel.bind(this);
			this.handleOk=this.handleOk.bind(this);
			this.handleFocus=this.handleFocus.bind(this);
            this.openNotification=this.openNotification.bind(this);

	}
	componentDidMount(){
		if(this.props.location.query.value.title==="编辑人员信息"){

		this.setData();
		}
	}
	openNotification(noteMsg){
		notification.open({
        message: noteMsg.message,
        description:noteMsg.description
        });
	}
	handleCancel(){
		this.props.history.push("/admin/AddExam");
	};
	handleOk(){
	   const data=this.state.addData;
	   if(this.props.location.query.value.title==="编辑人员信息"){
	   fetch('/update/stdInfo',{
	   	method:'post',
		headers:{
			'Content-Type':'application/json'
		},
		body:JSON.stringify(data)
	   })		
	   .then((response)=>{
			return response.json();
		})
		.then((data)=>{
			if(data.msg==="修改成功"){
				const noteMsg={
					message:'修改成功',
                    description:''
				};
				this.openNotification(noteMsg);
				this.props.history.push("/admin/AddExam");
			}
		})
	}
	else{
		fetch('/save/stdInfo',{
	   	method:'post',
		headers:{
			'Content-Type':'application/json'
		},
		body:JSON.stringify(data)
	   })		
	   .then((response)=>{
			return response.json();
		})
		.then((data)=>{
			if(data.msg==="保存成功"){
				const noteMsg={
					message:'保存成功',
                    description:''
				};
				this.openNotification(noteMsg);
				this.props.history.push("/admin/AddExam");
			}
		})
	}
	}
	handleFocus(e){
        const selValue=this.props.location.query.value.teachOpts;
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
	handlerChange(e){
		const target=e.target;
		const name=target.name;
		const value=target.value;
		this.state.addData[name]=value;
		const state=this.state.addData;
		this.setState({
			addData:state
		},()=>{
			console.log(this.state.addData);
		})
	}

	setData(){
		const data=this.props.location.query.value.addData;
		this.setState({
			addData:data,
			checkState:this.props.location.query.value.defaultChecked
		})
	}
	render(){
		//const addData=this.props.value.addData;
		//console.log("propslocation:"+JSON.stringify(this.props.location.query));
		const state=this.state;
		const visible=true;
		return(
			<div onClick={this.handleFocus}>
			 <Modal
			 visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="back" onClick={this.handleCancel}>取消</Button>,
              <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
              提交
              </Button>,
          ]}
			 >
          <div style={{width:'80%',margin:'auto'}}>
          <span>姓名<span style={{color:'red'}}>*</span></span>
          <input name="stdName" type="text" value={state.addData.stdName}  className="info-input form-control" onChange={this.handlerChange}/>
          <span>监考老师<span style={{color:'red'}}>*</span></span>
          <div  >
          <input name="techName" type="text" value={state.addData.techName}   className="info-input form-control" 
           onChange={this.handlerChange}/>
          </div>
          <span>考号<span style={{color:'red'}}>*</span></span>
          <input name="stdNum" type="text" value={state.addData.stdNum}  className="info-input form-control" onChange={this.handlerChange}/>
          <span>考场号<span style={{color:'red'}}>*</span></span>
          <input name="roomNum" type="text" value={state.addData.roomNum} className="info-input form-control" onChange={this.handlerChange}/>
          </div>

          <InputMulSelect value={this.props.location.query.value.teachOpts} defaultSelected={this.props.location.query.value.defaultChecked} visible={this.state.selVisible} handleClick={this.handleFocus}/>
          </Modal>
          </div>
			)
	}
}