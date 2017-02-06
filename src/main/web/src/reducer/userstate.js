import { browserHistory } from 'react-router'

import { 
	USERSTATE_LOGIN_START, 
	USERSTATE_LOGIN_FAILED, 
	USERSTATE_LOGIN_SUCCESS,
	USERSTATE_REGIST_START,
	USERSTATE_REGIST_FAILED,
	USERSTATE_REGIST_SUCCESS
} from '../actions/userstate'

export const INITIAL_USERSTATE = {
	message: '',
	isLogined: false,
	isLogining: false,
	loginFailed: false,
	isRegisting: false,
	registFailed: false,
	token: null,
	user: {
		uid: null,
		pwd: null
	}
}

export default (state=INITIAL_USERSTATE,action) => {


	switch(action.type){

		case USERSTATE_LOGIN_START:
			return Object.assign({},state,{
				loginFailed: false,
				isLogining: true
			})
		case USERSTATE_LOGIN_SUCCESS:

			browserHistory.push('/home')

			return Object.assign({},state,{
				isLogined: true,
				isLogining: false,
				loginFailed: false,
				token: action.token,
				user: {
					uid: action.uid,
					pwd: action.pwd
				}
			})
		case USERSTATE_LOGIN_FAILED:
			return Object.assign({},state,{
				message: action.error,
				isLogined: false,
				isLogining: false,
				loginFailed: true
			})
		case USERSTATE_REGIST_START:
			return Object.assign({},state,{
				registFailed: false,
				isRegisting: true
			})
		case USERSTATE_REGIST_FAILED:
			return Object.assign({},state,{
				message: action.error,
				isRegisting: false,
				registFailed: true
			})
		case USERSTATE_REGIST_SUCCESS:
			return Object.assign({},state,{
				isRegisting: false,
				registFailed: false
			})
		default: 
			return state

	}


}