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

	fetch('http://localhost:8080/user/query.action').then( response => {
		return response.json()
	}).then( json => {
		console.log(json)
	}).catch( ex => {
		console.log(ex)
	})

}


document.getElementById('btn-groups').onclick = () =>{

	fetch('http://localhost:8080/user_group/query.action').then( response => {
		return response.json()
	}).then( json => {
		console.log(json)
	}).catch( ex => {
		console.log(ex)
	})

}