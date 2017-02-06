import 'whatwg-fetch'

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

				return token

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


