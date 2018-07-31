import React from 'react';

export default class InputMulSelect extends React.Component{
	constructor(props){
		super(props);
		this.state={
			visible:'none'
		}
		this.handleChange=this.handleChange.bind(this);
	}

	handleChange(e){
		let target=e.target;
		console.log(target.value);
		this.props.handleClick(e);
	}

	render(){
		const visible=this.props.visible?'block':'none';
		console.log(visible);
		let optState=this.props.defaultSelected;
		//let defaultState=this.props.defaultChecked;
		const optsValue=[];
		this.props.value.map((value,index)=>{
					optsValue.push(<div key={index}><input name="selinput" defaultChecked={optState[index]} type="checkbox"  value={index} onChange={this.handleChange}/>{value}</div>)
				});
		return(
			<div className="input-mulselect" style={{display:visible,textAlign:'left'}} onClick={this.props.handleClick}>
			{optsValue}
			</div>
			)
	}
} 