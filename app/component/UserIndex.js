import React from 'react';
import TopNav from './TopNav';
import NavSelect from './NavSelect';

export default class  UserIndex extends React.Component{
	render(){
		let username=localStorage.getItem('username');
		return(
			<div>
			<TopNav user={username}/>
			<NavSelect user="user"/>
			</div>
			)
	}
}
