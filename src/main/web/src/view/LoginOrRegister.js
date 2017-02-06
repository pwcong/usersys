import React from 'react'
import LoginForm from '../component/LoginForm'
import RegisterForm from '../component/RegisterForm'
import style from './style/login_or_register.css'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { toLogin, toRegister } from '../actions/userstate'

class LoginOrRegister extends React.Component{

	constructor(props) {
		super(props)

		this.state = {
			doLogin: true
		}

    this.handleOnLoginSubmit = this.handleOnLoginSubmit.bind(this)
    this.handleOnRegisterSubmit = this.handleOnRegisterSubmit.bind(this)
	}

  handleOnLoginSubmit(values){
    this.props.dispatch(toLogin(values.uid,values.pwd,()=>{
      browserHistory.push('/home')
    }))
  }

  handleOnRegisterSubmit(values){
    this.props.dispatch(toRegister(values.uid,values.pwd, () => {
      this.handleOnLoginSubmit(values)
    }))
  }

	render(){

		return (
      <div className={style['root']}>
        {
          this.state.doLogin ? (
              <LoginForm 
                message={this.props.userstate.message}
                isError={this.props.userstate.loginFailed}
                isLogining={this.props.userstate.isLogining}
                onSubmit={this.handleOnLoginSubmit}
                onToRegister={ () => {
                  this.setState({
                    doLogin: !this.state.doLogin
                  })
                }}/>
            ):(
              <RegisterForm 
                message={this.props.userstate.message}
                isError={this.props.userstate.registFailed}
                isRegisting={this.props.userstate.isRegisting}
                onSubmit={this.handleOnRegisterSubmit}
                onToLogin={ () => {
                  this.setState({
                    doLogin: !this.state.doLogin
                  })
                }}
                />
            )        
        }
      </div>
		)

	}

}

function select(state){
  return ({
    userstate: state.userstate
  })
}

export default connect(select)(LoginOrRegister)