import React from 'react'
import RegisterForm from '../component/RegisterForm'
import style from './style/useradder.css'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Button, message } from 'antd'
import { addUser } from '../actions/data'

class UserAdder extends React.Component{


	constructor(props) {
		super(props);

		this.state = {
			message: '',
			isRegisting: false,
			isError: false
		}

		this.componentDidMount = this.componentDidMount.bind(this)
		this.handleOnRegisterSubmit = this.handleOnRegisterSubmit.bind(this)
	}


	handleOnRegisterSubmit(values){

		this.setState({
			isError: false,
			isRegisting: true
		})

		this.props.dispatch(addUser(
			values.uid,
			values.pwd,
			() => {
				message.success('注册成功')
				this.setState({
					isRegisting: false,
					isError: false,
					message: ''
				})
			},
			error => {
				this.setState({
					isRegisting: false,
					isError: true,
					message: error
				})
			}
		))
	}

	handleBackClick(){
		browserHistory.push('/home/user')
	}

	componentDidMount() {
		if(!this.props.userstate.group.write)
			browserHistory.push('/home/user')
	}


	render(){

		return (

			<div className={style.root}>

				<Button icon="left" onClick={this.handleBackClick}>返回</Button>

				<div className={style.content}>
					<RegisterForm 
						isError={this.state.isError}
						message={this.state.message}
						isRegisting={this.state.isRegisting}
						onSubmit={this.handleOnRegisterSubmit}/>
				</div>
			</div>

		)

	}

}

function select(state){
	return ({
		userstate: state.userstate
	})
}

export default connect(select)(UserAdder)