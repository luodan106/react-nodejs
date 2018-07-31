import React,{Component,Fragment} from 'react';
import TopNav from './TopNav';
import NavSelect from './NavSelect';

const Wrapper=({children})=>children;

export default class AdminIndex extends Component{
	constructor(props){
		super(props);

	}
	render(){
			let username=localStorage.getItem('username');
		return(
			<Fragment>
			<TopNav user={username}/>
			<NavSelect user="admin"> 
			</NavSelect>
			</Fragment>
			)
	}
}