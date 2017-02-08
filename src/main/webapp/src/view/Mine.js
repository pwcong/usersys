import React from 'react'
import style from './style/mine.css'
export default class Mine extends React.Component{

	render(){

		return (
			<div className={style.root}>
				{this.props.children}
			</div>

		)

	}

}