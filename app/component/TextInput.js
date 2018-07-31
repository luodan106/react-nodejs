import React from 'react';

export default class TextInput extends React.Component{
    constructor(props){
    	super(props);
    	this.state={
    		[this.props.name]:''
    	}

        this.handleChange=this.handleChange.bind(this);
    }

    handleChange(event){
    	/*const target=event.target;
    	const value=target.value;
    	this.setState({
    	    		[this.props.name]:value
    	    	});

        console.log(this.state);*/
    	//this.props.changetext(this.state);
        this.props.changetext(event);
    }
    render(){
        let name=this.props.name;
    	return(
    		<input type={this.props.type} name={this.props.name} className="info-input form-control" placeholder={this.props.placeholder} value={this.state.name} onChange={this.handleChange}/>
    		)
    }
}