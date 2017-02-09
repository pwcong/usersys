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

export const DATA_GET_USERINFO_START = "DATA_GET_USERINFO_START"
export function getUserInfoStart(){
	return ({
		type: DATA_GET_USERINFO_START
	})
}

export const DATA_GET_USERINFO_FAILED = "DATA_GET_USERINFO_FAILED"
export function getUserInfoFailed(){
	return ({
		type: DATA_GET_USERINFO_FAILED
	})
}

export const DATA_GET_USERINFO_SUCCESS = "DATA_GET_USERINFO_SUCCESS"
export function getUserInfoSuccess(result){
	return ({
		type: DATA_GET_USERINFO_SUCCESS,
		result
	})
}

export function toGetUserInfo(token,uid,callbackWhenError){

	return dispatch => {

		dispatch(getUserInfoStart())

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
				dispatch(getUserInfoSuccess(json.result))
			}
			else{
				dispatch(getUserInfoFailed())
				callbackWhenError(json.message)
			}
		}).catch( ex => {
			dispatch(getUserInfoFailed())
			callbackWhenError("未知错误")
		})	



	}

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

export const DATA_MODIFY_USER_GROUP_SUCCESS = 'DATA_MODIFY_USER_GROUP_SUCCESS'

export function modifyUserGroupSuccess(uid,gid){
	return ({
		type: DATA_MODIFY_USER_GROUP_SUCCESS,
		uid,
		gid
	})
}
export function modifyUserGroup(token,user,target,callbackWhenSuccess,callbackWhenError){

	return dispatch => {

		fetch('/user/modify_group.action',{
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
					uid: target.uid,
					gid: target.gid
				}
			})
		}).then( response => {
			return response.json()
		}).then( json => {
			if(json.status === 200){
				callbackWhenSuccess()
				dispatch(modifyUserGroupSuccess(target.uid,target.gid))
			}
			else
				callbackWhenError(json.message)
		}).catch( ex => {
			callbackWhenError("未知错误")
		})	

	}

}

export const DATA_MODIFY_USERINFO_START = "DATA_MODIFY_USERINFO_START"
export function modifyUserInfoStart(){
	return ({
		type: DATA_MODIFY_USERINFO_START
	})
}

export const DATA_MODIFY_USERINFO_FAILED = "DATA_MODIFY_USERINFO_FAILED"
export function modifyUserInfoFAILED(){
	return ({
		type: DATA_MODIFY_USERINFO_FAILED
	})
}

export const DATA_MODIFY_USERINFO_SUCCESS = "DATA_MODIFY_USERINFO_SUCCESS"
export function modifyUserInfoSuccess(userinfo){
	return ({
		type: DATA_MODIFY_USERINFO_SUCCESS,
		userinfo
	})
}

export function toModifyUserInfo(token,user,userInfo,callbackWhenSuccess,callbackWhenError){

	return dispatch => {

		dispatch(modifyUserInfoStart())

		fetch('/user_info/modify.action',{
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
				userInfo: Object.assign({},userInfo,{
					uid: user.uid
				})
			})
		}).then( response => {
			return response.json()
		}).then( json => {
			if(json.status === 200){
				dispatch(modifyUserInfoSuccess(userInfo))
				callbackWhenSuccess()
			}
			else{
				dispatch(modifyUserInfoFAILED())
				callbackWhenError(json.message)
			}
		}).catch( ex => {
			dispatch(modifyUserInfoFAILED())
			callbackWhenError("未知错误")
		})	

	}

}