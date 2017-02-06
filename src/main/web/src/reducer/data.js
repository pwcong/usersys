import {
	DATA_GET_USERS_START,
	DATA_GET_USERS_FAILED,
	DATA_GET_USERS_SUCCESS,
	DATA_GET_GROUPS_START,
	DATA_GET_GROUPS_FAILED,
	DATA_GET_GROUPS_SUCCESS

} from '../actions/data'


export const INITIAL_DATA = {
	isLoading: false,
	users: [],
	groups: [],
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
		default:
			return state
	}


}