import {
	DATA_GET_USERS_START,
	DATA_GET_USERS_FAILED,
	DATA_GET_USERS_SUCCESS,
	DATA_GET_GROUPS_START,
	DATA_GET_GROUPS_FAILED,
	DATA_GET_GROUPS_SUCCESS,
	DATA_DELETE_USER_SUCCESS,
	DATA_MODIFY_USER_GROUP_SUCCESS

} from '../actions/data'


export const INITIAL_DATA = {
	isLoading: false,
	users: [
		{
			createdAt: "Feb 1, 2017 1:07:05 PM",
			gid: 9,
			uid: "pwcong",
		},{
			createdAt: "Feb 1, 2017 1:07:05 PM",
			gid: 1,
			uid: "pliping",
		},{
			createdAt: "Feb 1, 2017 1:07:05 PM",
			gid: 1,
			uid: "maxcon",
		},{
			createdAt: "Feb 1, 2017 1:07:05 PM",
			gid: 2,
			uid: "penjanjan",
		}
	],
	groups: [
		{"id":0,"name":"游客","read":false,"write":false,"root":false},
		{"id":1,"name":"普通用户","read":true,"write":false,"root":false},
		{"id":2,"name":"管理员","read":true,"write":true,"root":false},
		{"id":9,"name":"系统","read":true,"write":true,"root":true}
	],
	userinfo: null
}

export default (state=INITIAL_DATA,action) => {


	switch(action.type){

		case DATA_GET_USERS_START:
		case DATA_GET_GROUPS_START:
			return Object.assign({},state,{
				isLoading: true
			})
		case DATA_GET_GROUPS_FAILED:
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
		default:
			return state
	}


}