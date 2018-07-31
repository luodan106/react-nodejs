import React from 'react';
import {Link} from 'react-router-dom';

export default class NavSelect extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		const user=this.props.user;
		const liitem=[];
		if(user==="admin"){
			let i=0;
			liitem.push(<li key={i}><Link  to="/admin/setting">教师配置</Link></li>);
			liitem.push( <li key={++i}><Link to="/admin/AddExam">考试情况配置</Link></li>);
			liitem.push(<li key={++i}><Link to="/admin/AllHistory">历史纪录</Link></li>);

		}
		else{
			let i=0;
			liitem.push(<li key={i}><Link to="/user/CurrentExam">当前考试</Link></li>);
			liitem.push(<li key={++i}><Link to="/user/AllHistory">历史评分纪录</Link></li>);

		}
		return(
			<nav className="navbar" role="navigation">
			   <ul className="nav">
			      {liitem}
			   </ul>
			</nav>
			);
		}
}