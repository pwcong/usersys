import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux' 
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'

import reducer from './reducer'
import routes from './routes'



const store = createStore(reducer,applyMiddleware(thunk))

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory} routes={routes}/>
	</Provider>,
	document.getElementById('app')
)

