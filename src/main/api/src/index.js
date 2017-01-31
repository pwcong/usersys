import 'whatwg-fetch'
import md5 from 'blueimp-md5'

document.getElementById('btn-login').onclick = () => {
	fetch('http://localhost:8080/user/login.action',{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			time: new Date().getTime(),
			user: {
				uid: document.getElementById('input-uid-login').value,
				pwd: md5(document.getElementById('input-pwd-login').value)
			}
			
		})
	}).then( response => {
		return response.json()
	}).then( json => {
		console.log(json)
	}).catch( ex => {
		console.log(ex)
	})
}

document.getElementById('btn-register').onclick = () =>{

	fetch('http://localhost:8080/user/register.action',{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			user: {
				uid: document.getElementById('input-uid-register').value,
				pwd: md5(document.getElementById('input-pwd-register').value)
			}
		})
	}).then( response => {
		return response.json()
	}).then( json => {
		console.log(json)
	}).catch( ex => {
		console.log(ex)
	})

}

document.getElementById('btn-modify-pwd').onclick = () =>{

	fetch('http://localhost:8080/user/modify_password.action',{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			user: {
				uid: document.getElementById('input-uid-modify-pwd').value,
				pwd: md5(document.getElementById('input-pwd-modify-pwd').value)
			},
			target: {
				uid: document.getElementById('input-uid-modify-pwd-target').value,
				pwd: md5(document.getElementById('input-pwd-modify-pwd-target').value)
			}
		})
	}).then( response => {
		return response.json()
	}).then( json => {
		console.log(json)
	}).catch( ex => {
		console.log(ex)
	})

}

document.getElementById('btn-modify-group').onclick = () =>{

	fetch('http://localhost:8080/user/modify_group.action',{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			user: {
				uid: document.getElementById('input-uid-modify-group').value,
				pwd: md5(document.getElementById('input-pwd-modify-group').value)
			},
			target: {
				uid: document.getElementById('input-uid-modify-group-target').value,
				gid: document.getElementById('input-group-modify-group-target').value
			}
		})
	}).then( response => {
		return response.json()
	}).then( json => {
		console.log(json)
	}).catch( ex => {
		console.log(ex)
	})

}

document.getElementById('btn-users').onclick = () =>{

	fetch('http://localhost:8080/user/query_all.action').then( response => {
		return response.json()
	}).then( json => {
		console.log(json)
	}).catch( ex => {
		console.log(ex)
	})

}


document.getElementById('btn-groups').onclick = () =>{

	fetch('http://localhost:8080/user_group/query_all.action').then( response => {
		return response.json()
	}).then( json => {
		console.log(json)
	}).catch( ex => {
		console.log(ex)
	})

}

document.getElementById('btn-remove-user').onclick = () =>{

	fetch('http://localhost:8080/user/remove.action',{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			user: {
				uid: document.getElementById('input-uid-remove-user').value,
				pwd: md5(document.getElementById('input-pwd-remove-user').value)
			},
			target: {
				uid: document.getElementById('input-uid-remove-user-target').value
			}
		})
	}).then( response => {
		return response.json()
	}).then( json => {
		console.log(json)
	}).catch( ex => {
		console.log(ex)
	})

}

document.getElementById('btn-group').onclick = () =>{

	fetch('http://localhost:8080/user_group/query.action',{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			user: {
				uid: document.getElementById('input-uid-group').value
			}
		})
	}).then( response => {
		return response.json()
	}).then( json => {
		console.log(json)
	}).catch( ex => {
		console.log(ex)
	})

}

document.getElementById('btn-user-info').onclick = () =>{

	fetch('http://localhost:8080/user_info/query.action',{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			user: {
				uid: document.getElementById('input-uid-user-info').value
			}
		})
	}).then( response => {
		return response.json()
	}).then( json => {
		console.log(json)
	}).catch( ex => {
		console.log(ex)
	})

}

document.getElementById('btn-get-user-info').onclick = () =>{

	fetch('http://localhost:8080/user_info/query.action',{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			user: {
				uid: document.getElementById('input-uid-modify-user-info-uid').value
			}
		})
	}).then( response => {
		return response.json()
	}).then( json => {
		console.log(json)

		document.getElementById('input-uid-modify-user-info-name').value = json.result.name

	}).catch( ex => {
		console.log(ex)
	})

}

document.getElementById('btn-modify-user-info').onclick = () =>{

	fetch('http://localhost:8080/user_info/modify.action',{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			user: {
				uid: document.getElementById('input-uid-modify-user-info').value,
				pwd: md5(document.getElementById('input-pwd-modify-user-info').value)
			},
			target: {
				uid: document.getElementById('input-uid-modify-user-info-uid').value
			},
			userInfo: {
				uid: document.getElementById('input-uid-modify-user-info-uid').value,
				name: document.getElementById('input-uid-modify-user-info-name').value
			}
		})
	}).then( response => {
		return response.json()
	}).then( json => {
		console.log(json)

	}).catch( ex => {
		console.log(ex)
	})

}