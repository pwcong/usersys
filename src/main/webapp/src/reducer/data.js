import {
	DATA_GET_USERS_START,
	DATA_GET_USERS_FAILED,
	DATA_GET_USERS_SUCCESS,
	DATA_GET_GROUPS_START,
	DATA_GET_GROUPS_FAILED,
	DATA_GET_GROUPS_SUCCESS,
	DATA_DELETE_USER_SUCCESS,
	DATA_MODIFY_USER_GROUP_SUCCESS,
	DATA_GET_USERINFO_START,
	DATA_GET_USERINFO_FAILED,
	DATA_GET_USERINFO_SUCCESS,
	DATA_MODIFY_USERINFO_START,
	DATA_MODIFY_USERINFO_FAILED,
	DATA_MODIFY_USERINFO_SUCCESS
} from '../actions/data'


export const INITIAL_DATA = {
	isModifying: false,
	isLoading: false,
	users: [
	],
	groups: [
	],
	userinfo: {
		"uid":"",
		"name":"",
		"sex":0,
		"birthday":"",
		"email":"",
		"phone":"",
		"signature":""
	}
}

export default (state=INITIAL_DATA,action) => {


	switch(action.type){

		case DATA_GET_USERS_START:
		case DATA_GET_USERINFO_START:
		case DATA_GET_GROUPS_START:
			return Object.assign({},state,{
				isLoading: true
			})
		case DATA_GET_GROUPS_FAILED:
		case DATA_GET_USERINFO_FAILED:
		case DATA_GET_USERS_FAILED:
			return Object.assign({},state,{
				isLoading: false
			})
		case DATA_GET_USERS_SUCCESS:
			return Object.assign({},state,{
				isLoading: false,
				users: [...action.result]
			})
		case DATA_GET_GROUPS_SUCCESS:
			return Object.assign({},state,{
				isLoading: false,
				groups: [...action.result]
			})
		case DATA_DELETE_USER_SUCCESS:
			return Object.assign({},state,{
				users: state.users.filter(user => {
					return user.uid !== action.uid
				})
			})
		case DATA_MODIFY_USER_GROUP_SUCCESS:
			return Object.assign({},state,{
				users: state.users.map( user => {
					if(user.uid === action.uid)
						return ({
							createdAt: user.createdAt,
							uid: user.uid,
							gid: action.gid
						})
					return user
				})
			})
		case DATA_GET_USERINFO_SUCCESS:
			return Object.assign({},state,{
				userinfo: Object.assign({},action.result),
				isLoading: false
			})
		case DATA_MODIFY_USERINFO_START:
			return Object.assign({},state,{
				isModifying: true
			})
		case DATA_MODIFY_USERINFO_FAILED:
			return Object.assign({},state,{
				isModifying: false
			})
		case DATA_MODIFY_USERINFO_SUCCESS:
			return Object.assign({},state,{
				isModifying: false,
				userinfo: Object.assign({},state.userinfo,action.userinfo)
			})
		default:
			return state
	}


}