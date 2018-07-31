import React from 'react';
import {Table} from 'antd';
import fetchGetData from '../fetchData';
import hocfun from './hoc';



class UserCurrentExam extends React.Component{
	
	render(){
		return(
		    <div style={{width:'80%',margin:"40px auto"}}>
		      <Table  columns={this.props.columns} dataSource={this.props.data}/>
			</div>
			);
	}
}

UserCurrentExam=hocfun(UserCurrentExam);

export default UserCurrentExam;