import React from 'react';
import TextInput from './TextInput';
import {withRouter  } from 'react-router-dom';

export default class LoginDiv extends  React.Component{
    constructor(props){
        super(props);
        this.state={
                  username:'',
                  password:''
                }
        this.handleClick=this.handleClick.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }

    handleChange(event){
      let target=event.target;
      let name=target.name;
      let value=target.value;
      this.setState({
              [name]:value
            })
    }

    handleClick(event){
       const target=event.target;
       if(target.value==="注册")
       {
        this.props.history.push('/signin');
       }
       else{
        let data=JSON.stringify(this.state);
        fetch('/logSure',{
            method:"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:data
        })
        .then((response)=>{
          return response.json();
        })
        .then((data)=>{
          let userInfo=data.msg;
          if(userInfo==="该用户尚未注册")
          {
            alert("该用户尚未注册");
          }
          else{
            localStorage.setItem("username",userInfo.username);
            if(userInfo.idauthority==="管理员"){
              //this.props.history.push({pathname:'/admin',query:{username:userInfo.username}});
              this.props.history.push('/admin');
            }else{
              this.props.history.push('/user');
            }
          }
        })
        .catch((err)=>{
          console.log(err);
        })
       }
    }

    render(){
    	return(
    		<div className="login-div">
               <div className="login-info">
               <TextInput type="text" name="username" placeholder="请输入用户名" changetext={this.handleChange}/>
               <TextInput type="password" name="password" placeholder="请输入密码" changetext={this.handleChange}/>
               </div>
               <div className="login-button" onClick={this.handleClick}>
               <input type="button" className="button-cls btn btn-default" value="登录"/>
               <input type="button" className="button-cls btn btn-default" value="注册"/>
               </div>
    		</div>
    		)
    }
}