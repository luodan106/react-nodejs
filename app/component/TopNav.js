import React from 'react';
import {Link,NavLink} from 'react-router-dom';

export default class TopNav extends React.Component{
	constructor(props){
		super(props);
		this.state={

		};
	}
	render(){
		return(
			<div className="top-nav">
			<span style={{color: '#565353',marginLeft:'95%'}}>{this.props.user}</span>
			<Link to="/" className="link-href">注销</Link>
			</div>
			)
	}
}