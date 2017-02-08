import 'whatwg-fetch'
import md5 from 'blueimp-md5'

export const DATA_GET_USERS_START = "DATA_GET_USERS_START"
export function getUsersStart(){
	return ({
		type: DATA_GET_USERS_START
	})
}

export const DATA_GET_USERS_FAILED = "DATA_GET_USERS_FAILED"
export function getUsersFAILED(){
	return ({
		type: DATA_GET_USERS_FAILED
	})
}

export const DATA_GET_USERS_SUCCESS = "DATA_GET_USERS_SUCCESS"
export function getUsersSuccess(result){
	return ({
		type: DATA_GET_USERS_SUCCESS,
		result
	})
}

export const DATA_GET_GROUPS_START = "DATA_GET_GROUPS_START"
export function getGroupsStart(){
	return ({
		type: DATA_GET_GROUPS_START
	})
}

export const DATA_GET_GROUPS_FAILED = "DATA_GET_GROUPS_FAILED"
export function getGroupsFAILED(){
	return ({
		type: DATA_GET_GROUPS_FAILED
	})
}

export const DATA_GET_GROUPS_SUCCESS = "DATA_GET_GROUPS_SUCCESS"
export function getGroupsSuccess(result){
	return ({
		type: DATA_GET_GROUPS_SUCCESS,
		result
	})
}



export function getUsersAndGroups(token,callbackWhenError){

	return ( dispatch ) => {

		dispatch(getUsersStart())

		fetch('/user/query_all.action',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Token': token
			}
		}).then( response => {
			return response.json()
		}).then( json => {

			if(json.status === 200)
				dispatch(getUsersSuccess(json.result))
			else{
				dispatch(getUsersFAILED())
				callbackWhenError(json.message)
			}

			return token

		}).then( token => {

			dispatch(getGroupsStart())

			fetch('/user_group/query_all.action',{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Token': token
				}
			}).then( response => {
				return response.json()
			}).then( json => {

				if(json.status === 200)
					dispatch(getGroupsSuccess(json.result))
				else{
					dispatch(getGroupsFAILED())
					callbackWhenError(json.message)
				}

			}).catch( ex => {
				dispatch(getGroupsFAILED())
				callbackWhenError('未知错误')
			})


		}).catch( ex => {
			dispatch(getUsersFAILED())
			callbackWhenError('未知错误')
		})


	}

}


export const DATA_DELETE_USER_SUCCESS = "DATA_DELETE_USER_SUCCESS"
export function deleteUserSuccess(uid){
	return ({
		type: DATA_DELETE_USER_SUCCESS,
		uid
	})
}

export function deleteUser(token,user,target,callbackWhenSuccess,callbackWhenError){

	return dispatch => {

		fetch('/user/remove.action',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Token': token
			},
			body: JSON.stringify({
				user: {
					uid: user.uid,
					pwd: user.pwd
				},
				target: {
					uid: target.uid
				}
			})
		}).then( response => {
			return response.json()
		}).then( json => {

			if(json.status === 200){
				dispatch(deleteUserSuccess(target.uid))
				callbackWhenSuccess()
			}
			else{
				callbackWhenError(json.message)
			}

		}).catch( ex => {
			dispatch(getGroupsFAILED())
			callbackWhenError('未知错误')
		})

	}

}

export const DATA_ADD_USER_SUCCESS = "DATA_ADD_USER_SUCCESS"
export function addUserSuccess(uid){
	return ({
		type: DATA_ADD_USER_SUCCESS,
		uid
	})
}

export function addUser(uid,pwd,callbackWhenSuccess,callbackWhenError){


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
			callbackWhenSuccess()
		}
		else
			callbackWhenError(json.message)
	}).catch( ex => {
		callbackWhenError("未知错误")
	})

}

export function getUserInfo(token,uid,callbackWhenSuccess,callbackWhenError){

	fetch('/user_info/query.action',{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Token': token
		},
		body: JSON.stringify({
			user: {
				uid: uid
			}
		})
	}).then( response => {
		return response.json()
	}).then( json => {
		if(json.status === 200){
			callbackWhenSuccess(json.result)
		}
		else
			callbackWhenError(json.message)
	}).catch( ex => {
		callbackWhenError("未知错误")
	})


}