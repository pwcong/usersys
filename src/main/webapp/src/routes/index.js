import React from 'react'
import ReactDOM from 'react-dom'
import { Route, IndexRoute } from 'react-router'
import App from '../view/App'
import LoginOrRegister from '../view/LoginOrRegister'
import Home from '../view/Home'
import Overview from '../view/Overview'
import User from '../view/User'
import Users from '../view/Users'
import UserAdder from '../view/UserAdder'
import Mine from '../view/Mine'
import UserInfo from '../view/UserInfo'

export default (
	
	<Route path="/" component={App}>
		<IndexRoute component={LoginOrRegister}/>
		<Route path="home" component={Home}>
			<IndexRoute component={Overview}/>
			<Route path="user" component={User}>
				<IndexRoute component={Users}/>
				<Route path="add" component={UserAdder}/>
			</Route>
			<Route path="mine" component={Mine}>
				<IndexRoute component={UserInfo}/>
			</Route>
		</Route>
		
	</Route>
)
