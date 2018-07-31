import React from 'react';
import {Modal,Table, Button,Divider,notification } from 'antd';

const columns = [{
  title: '姓名',
  dataIndex: 'teacherName',
  sorter: (a, b) => a.teacherName.length - b.teacherName.length,
  }, 
  {
  title: '工号',
  dataIndex: 'workNum',
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.workNum - b.workNum,
  }, 
  {
  title: '学院',
  dataIndex: 'institution',
  sorter: (a, b) => a.institution.length - b.institution.length,
  },
  {
	title:'操作',
	render:()=><a href="#">编辑</a> 
}
];

let selectedRow=[];


export default class AdminSetting extends React.Component{
	constructor(props){
	  super(props);
    this.state={
      data:[],
      addData:{
        teacherName:'',
        workNum:'',
        institution:''
      },
      visible:false,
      loading: false,
      selectedRowKeys:[]
    }
      this.onChange=this.onChange.bind(this);
      this.fetchData=this.fetchData.bind(this);
      this.clickAdd=this.clickAdd.bind(this);
      this.handleOk=this.handleOk.bind(this);
      this.handleCancel=this.handleCancel.bind(this);
      this.handleChange=this.handleChange.bind(this);
      this.openNotification=this.openNotification.bind(this);
      this.deleteData=this.deleteData.bind(this);

    }
    componentDidMount(){
    this.fetchData();	
    }
    onChange(pagination, filters, sorter){
       console.log('params', pagination, filters, sorter);
    }
    openNotification(noteMsg){
       notification.open({
        message: noteMsg.message,
        description:noteMsg.description
        });
    };
    handleChange(event){
      const target=event.target;
      const name=target.name;
      const value=target.value;
      this.state.addData[name]=value;
      const addData=this.state.addData;
      this.setState({
        addData:addData
      })
    }
    clickAdd(){
      console.log("addModal");
      this.setState({
        visible:true
      })
    }
    deleteData(){

      let noteMsg={};
      if(selectedRow.length>0){
        const delNum=[];
        selectedRow.map((value)=>{
          delNum.push({"workNum":value.workNum});
        });
        fetch('/delete/techInfo',{
          method:'post',
          headers:{
                'Content-Type':'application/json'
            },
          body:JSON.stringify({data:delNum})
        })
        .then((response)=>{
          return response.json();
        })
        .then((data)=>{
          if(data.msg==="删除成功"){

          noteMsg={
            message: '删除成功',
           description:''
          }
          
        this.openNotification(noteMsg);
            this.fetchData();
          }
        })
      }
      else{
        noteMsg={
          message:"请选择删除项",
          description:''
        }

        this.openNotification(noteMsg);
        }
      }
    
    handleCancel(){
      this.setState({
        visible:false
      })
    }
    handleOk(){
      this.state.loading=true;
      const submitData=JSON.stringify(this.state.addData);
      fetch('/save/techInfo',{
        method:'post',
        headers:{
                'Content-Type':'application/json'
            },
        body:submitData
      })
      .then((response)=>{
        this.state.loading=false;
        return response.json();
      })
      .then((data)=>{
        let noteMsg={};
        if(data.msg="添加成功"){
          this.setState({
            addData:{
            teacherName:'',
            workNum:'',
            institution:''
            },
            visible:false,
            loading: false
          },()=>{
            this.fetchData();
          });
          noteMsg={
            message: '添加成功',
            description:'' }
        }
        else{
          this.setState({
            visible:true,
            loading: false
          });
          noteMsg={
            message: '添加失败',
            description:err
          }
        }
        this.openNotification(noteMsg);
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    fetchData(){

      this.setState({
        selectedRowKeys:[]
      })
    	fetch('/getuserdata',{method:"get"})
    	.then((response)=>{
    		return response.json();
    	})
    	.then((data)=>{
        let stateData=[];
        
        data.msg.map((value,index)=>{
          let tech={
          key:0,
          teacherName:'',
          workNum:'',
          institution:''
        }
          tech.key=index;
          tech.teacherName=value.teacherName;
          tech.workNum=value.workNum;
          tech.institution=value.institution;
          stateData.push(tech);
        })
        this.setState({
          data:stateData
        })

    	})
    	.catch((err)=>{
    		console.log(err);
    	})
    }
    render() {
      let state=this.state;
      let selectedRowKeys=this.state.selectedRowKeys;
      const rowSelection = {
          selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            selectedRow=selectedRows;
            this.setState({
              selectedRowKeys:selectedRowKeys
            })
    ///*console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);*/
     },
      getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
  }),
};

    return (
      <div>
       <Button type="primary" style={{marginLeft:'75%',marginBottom:'8px'}} onClick={this.clickAdd}>添加</Button>
       <Button type="primary" style={{marginLeft:'1%',marginBottom:'8px'}} onClick={this.fetchData}>刷新</Button>
       <Button type="primary" style={{marginLeft:'1%',marginBottom:'8px'}} onClick={this.deleteData}>删除</Button>
       <div style={{width:'80%',margin:"40px auto"}}>
       <Table rowSelection={rowSelection} columns={columns} dataSource={state.data} onChange={this.onChange} />
      </div>
      <Modal
          visible={state.visible}
          title="添加人员信息"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>取消</Button>,
            <Button key="submit" type="primary" loading={state.loading} onClick={this.handleOk}>
              提交
            </Button>,
          ]}
        >
        <div style={{width:'80%',margin:'auto'}}>
          <span>姓名<span style={{color:'red'}}>*</span></span>
          <input name="teacherName" type="text" value={state.addData.teacherName} className="info-input form-control" onChange={this.handleChange}/>
          <span>工号<span style={{color:'red'}}>*</span></span>
          <input name="workNum" type="text" value={state.addData.workNum} className="info-input form-control" onChange={this.handleChange}/>
          <span>学院<span style={{color:'red'}}>*</span></span>
          <input name="institution" type="text" value={state.addData.institution} className="info-input form-control" onChange={this.handleChange}/>
        </div>
        </Modal>
      </div>
    );
  }
}