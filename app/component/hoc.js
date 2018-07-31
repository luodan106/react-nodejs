import React,{Component} from 'react';
import fetchGetData from '../fetchData';

const hocfun=(WrappedComponent)=>{
	class LoadDataComponent extends Component{
		constructor(props){
		super(props);
		this.state={
			data:[]
		}
        this.dataarr=[];
	}
	componentDidMount(){
		this.fetchData();
	}
	editStdInfo=(e)=>{
		const target=e.target;
		const trnode=target.parentNode.parentNode;
		const rowIndex=trnode.rowIndex;
		const editData=this.dataarr[rowIndex-1];
		this.props.history.push({pathname:'/user/EditCurrentExam',data:editData});
	}
	fetchData=()=>{
		const loginuser=localStorage.getItem('username');
		const url='/gettecdata?techname='+loginuser+'';
		fetchGetData(url)
		.then((data)=>{
			const stddata=data.msg;
			console.log(stddata);
			if(stddata.length>0){
				stddata.map((value,index)=>{
			    const dataobj={};
			    dataobj.stdName=value.stdName;
			    dataobj.stdNum=value.stdNum;
			    dataobj.roomNum=value.roomNum;
			    dataobj.key=index;
			    this.dataarr.push(dataobj);
				})
				this.setState({
					data:this.dataarr
				})
			}
		})
		.catch((err)=>{
			console.log("err:"+err)
		})
	}
	render(){
	const columns=[{
	title:'学生姓名',
	dataIndex:'stdName'
    },{
	title:'学生考号',
	dataIndex:'stdNum'
    },{
	title:'考场号',
	      dataIndex:'roomNum'
    },{
	title:'操作',
	render:()=><a  onClick={this.editStdInfo}>填写</a> 
    }]
		return(
		   <WrappedComponent 
		   data={this.state.data}
		   columns={columns}
		   />
			);
	}
	}
	return LoadDataComponent;
}

export default hocfun;