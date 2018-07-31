'use strict';

import React from 'react';
import {Route,HashRouter as Router} from 'react-router-dom';
import LoginDiv from './LoginDiv';
import SignIn from './SignIn';
import TopNav from './TopNav';
import AdminIndex from './AdminIndex';
import AdminSetting from './AdminSetting';
import AdminSettingExam from './AdminSettingExam';
import AdminHistory from './AdminHistory';
import AddEditModal from './AddEditModal';
import UserIndex from './UserIndex';
import UserCurrentExam from './UserCurrentExam';
import UserHistory from './UserHistory';
import EditCurrentExam from './EditCurrentExam';

export default class AppRoutes extends React.Component{
	render(){

			const username=localStorage.getItem('username');
		return(
			<Router>
			<div>

			   <Route exact path="/" component={LoginDiv}/>
			   <Route  path="/signin" component={SignIn}/>
			   <Route  path="/admin" component={AdminIndex}/>
			   <Route path="/admin/setting" component={AdminSetting}/>
			   <Route path="/admin/AddExam" component={AdminSettingExam}/>
			   <Route path="/admin/AddExam/edit" component={AddEditModal}/>
			   <Route path="/admin/AllHistory" component={AdminHistory}/>
			   <Route path="/user" component={UserIndex}/>
			   <Route path="/user/CurrentExam" component={UserCurrentExam} />
			   <Route path="/user/AllHistory" component={UserHistory} />
			   <Route path="/user/EditCurrentExam" component={EditCurrentExam} />
			   <Route path="/admin/AddExam/add" component={AddEditModal} />
			   

			   </div>
			</Router>
			);
	}
}

