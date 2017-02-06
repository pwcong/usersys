import 'whatwg-fetch'
import md5 from 'blueimp-md5'

export const USERSTATE_LOGIN_START = "USERSTATE_LOGIN_START"
export function loginStart(){

	return ({
		type: USERSTATE_LOGIN_START
	})

}

export const USERSTATE_LOGIN_FAILED = "USERSTATE_LOGIN_FAILED"
export function loginFailed(error){
	return ({
		type: USERSTATE_LOGIN_FAILED,
		error
	})
}

export const USERSTATE_LOGIN_SUCCESS = "USERSTATE_LOGIN_SUCCESS"
export function loginSuccess(token,uid,pwd){
	return ({
		type: USERSTATE_LOGIN_SUCCESS,
		token,
		uid,
		pwd
	})
}

export function toLogin(uid,pwd){

	return ( dispatch ) => {

		dispatch(loginStart())

		pwd = md5(pwd)

		fetch('/user/login.action',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user: {
					uid: uid,
					pwd: pwd
				}
			})
		}).then( response => {
			return response.json()
		}).then( json => {
			if(json.status === 200)
				dispatch(loginSuccess(json.result,uid,pwd))
			else
				dispatch(loginFailed(json.message))
		}).catch( ex => {
			dispatch(loginFailed("未知错误"))
		})
	}

}


export const USERSTATE_REGIST_START = "USERSTATE_REGIST_START"
export function registStart(){

	return ({
		type: USERSTATE_REGIST_START
	})

}

export const USERSTATE_REGIST_FAILED = "USERSTATE_REGIST_FAILED"
export function registFailed(error){
	return ({
		type: USERSTATE_REGIST_FAILED,
		error
	})
}

export const USERSTATE_REGIST_SUCCESS = "USERSTATE_REGIST_SUCCESS"
export function registSuccess(){
	return ({
		type: USERSTATE_REGIST_SUCCESS
	})
}

export function toRegister(uid,pwd,toLogin){

		return ( dispatch ) => {

		dispatch(registStart())

		pwd = md5(pwd)

		fetch('/user/register.action',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user: {
					uid: uid,
					pwd: pwd
				}
			})
		}).then( response => {
			return response.json()
		}).then( json => {
			if(json.status === 200){
				dispatch(registSuccess())
				toLogin()
			}
			else
				dispatch(registFailed(json.message))
		}).catch( ex => {
			dispatch(registFailed("未知错误"))
		})
	}


}
