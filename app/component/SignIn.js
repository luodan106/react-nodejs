import React from 'react';
import TextInput from './TextInput';
import {Link} from 'react-router-dom';

export default class SignIn extends React.Component{
    constructor(props){
    	super(props);
        this.handleClick=this.handleClick.bind(this);
        this.state={
        	username:'',
        	password:'',
        	idauthority:'管理员',
            passwordAgain:''
        }
        this.handleChange=this.handleChange.bind(this);
        this.changeText=this.changeText.bind(this);
    }

    handleChange(event){
        let target=event.target;
        let name=target.name;
        let value=target.value;
    	this.setState({
    		[name]:value
    	},()=>{

        })
    }

    changeText(newState){
    	console.log(newState);
    	for(let state in newState){

    		this.setState({
    			[state]:newState[state]
    		})
    	}
    }

    handleClick(event){
        let data=this.state;
        data=JSON.stringify(data);
       /* let formData=new FormData;
        formData.append("username","username");
        formData.append("password","password");
        formData.append("idauthority","idauthority");*/

    	if(data.password!==data.passwordAgain){
            alert("确保两次密码一致");
        }else{
            fetch('/register',{
            method:"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:data
        })
            .then((response)=>{
                return response.json();
            }).then(data=>{
                if(data.msg==="注册成功"){
                    this.props.history.push('/');
                }
                else if(data.msg==="用户名重复"){
                    alert("用户名重复");
                }
                else{
                    console.log("error:"+data)
                    alert("error:"+JSON.stringify(data));
                }
            }).catch(err=>console.log(err));
        }
    }

    render(){
    	return(
    		<div className="register-div">
    		   <span>请输入用户名</span>
    		   <TextInput type="text" name="username" placeholder="" changetext={this.handleChange}/>
    		   <span>请输入密码</span>
    		   <TextInput type="password" name="password" placeholder="" changetext={this.handleChange}/>
    		   <span>确认密码</span>
    		   <TextInput type="password" name="passwordAgain" placeholder="" changetext={this.handleChange}/>
               <div className={this.state.password!==this.state.passwordAgain?"warning-div":"warning-div-hidden"}>
                 <span>两次密码不一致</span>
               </div>
    		   <span>选择角色</span>
    		   <select className="info-input  form-control" name="idauthority"  onChange={this.handleChange}>
    		      <option>管理员</option>
    		      <option>普通用户</option>
    		   </select>

               <input type="button" className="button-cls btn btn-default" value="确定" onClick={this.handleClick}/>
               <Link to="/" className="button-cls btn btn-default" value="返回登录" />
    		</div>
    		);
    }
}