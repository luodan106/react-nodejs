'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './component/AppRoutes';
require('../public/css/style.css');

if(module.hot) {
    module.hot.accept();
}

window.onload=()=>{
	ReactDOM.render(<AppRoutes/>,document.getElementById("main-content"));
}