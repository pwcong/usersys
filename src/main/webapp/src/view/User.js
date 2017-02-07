import React from 'react'
import style from './style/user.css'
export default class User extends React.Component{

	render(){

		return (
			<div className={style.root}>
				{this.props.children}
			</div>

		)

	}



}