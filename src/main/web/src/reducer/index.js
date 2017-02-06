import { combineReducers } from 'redux'
import userstate from './userstate'
import data from './data'

export default combineReducers({
	userstate,
	data
})