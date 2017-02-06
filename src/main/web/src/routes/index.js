import React from 'react'
import ReactDOM from 'react-dom'
import { Route, IndexRoute } from 'react-router'
import App from '../view/App'
import LoginOrRegister from '../view/LoginOrRegister'
import Home from '../view/Home'
import Overview from '../view/Overview'
import Users from '../view/Users'
import UserInfo from '../view/UserInfo'

export default (
	
	<Route path="/" component={App}>
		<IndexRoute component={LoginOrRegister}/>
		<Route path="home" component={Home}>
			<IndexRoute component={Overview}/>
			<Route path="users" component={Users}/>
			<Route path="userinfo" component={UserInfo}/>
		</Route>
		
	</Route>
)
