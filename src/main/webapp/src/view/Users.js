import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Table, Icon, Button, Spin, notification, Modal, message } from 'antd'
import { browserHistory } from 'react-router'
import { getUsersAndGroups, deleteUser, getUserInfo, modifyUserGroup } from '../actions/data'
import UserInfoForm from '../component/UserInfoForm'
import RadioButtonModal from '../component/RadioButtonModal'

import style from './style/users.css'

const confirm = Modal.confirm

class Users extends React.Component{

	constructor(props) {

		super(props)

		this.state = {
			visible: false,
			uid: null,
			gid: null
		}
		
		this.componentDidMount = this.componentDidMount.bind(this)
		this.handleDeleteUser = this.handleDeleteUser.bind(this)
		this.handleReviewUser = this.handleReviewUser.bind(this)
		this.handleAddUser = this.handleAddUser.bind(this)
		this.handleEditUser = this.handleEditUser.bind(this)
		this.handleEditUserSubmit = this.handleEditUserSubmit.bind(this)
		this.handleEditUserCancel = this.handleEditUserCancel.bind(this)
	}

	componentDidMount() {
		this.props.dispatch(getUsersAndGroups(
			this.props.userstate.token,
			error => {
					notification.open({
			    	message: '用户列表获取失败',
			    	description: error,
			    	icon: <Icon type="frown-o" style={{ color: '#108ee9' }} />,
				});
			}
		))
	}

	handleReviewUser(uid){

		message.warning('正在获取用户信息中')
		getUserInfo(
			this.props.userstate.token,
			uid,
			userinfo => {

				message.success('用户信息获取成功')
				
				Modal.info({
					title: uid + ' 的详细信息',
					content: (
						<UserInfoForm userinfo={userinfo}/>
					),
					onOk(){}
				})	
			},
			error => {
				message.error(error)
			}

		)


	}

	handleDeleteUser(uid){

		const { dispatch, userstate } = this.props

		confirm({
			title: '确定要删除用户 ' + uid + ' 吗？',
			content: '将同时删除该用户所有信息，该操作不可逆转',
			onOk(){
				message.warning('正在删除用户中')
				dispatch(deleteUser(
						userstate.token,
						{
							uid: userstate.user.uid,
							pwd: userstate.user.pwd
						},
						{
							uid: uid
						},
						() => {
							message.success('用户删除成功')
						},
						(error) => {
							message.error(error)
						}
					))
			},
			onCancel(){
				console.log('撤销删除用户')
			}
		})
	}

	handleAddUser(){
		browserHistory.push('/home/user/add')
	}

	handleEditUser(uid,gid){
		this.setState({
			visible: true,
			uid: uid,
			gid: gid
		})
	}

	handleEditUserSubmit(gid){
		message.warning('正在更改用户组中')
		this.props.dispatch(modifyUserGroup(
			this.props.userstate.token,
			this.props.userstate.user,
			{
				uid: this.state.uid,
				gid: gid
			},
			() => {
				message.success('用户组更改成功')
			},
			error => {
				message.error(error)
			}
		))
		this.setState({
			visible: false
		})

	}

	handleEditUserCancel(){
		this.setState({
			visible: false
		})
	}

	initColumns(isTourist,isAdmin,isRoot){

		const onDeleteUser = this.handleDeleteUser
		const onReviewUser = this.handleReviewUser
		const onEditUser = this.handleEditUser

		const columns = [{
		  	title: '用户名',
		  	dataIndex: 'uid',
		  	key: 'uid'
		}, {
		  	title: '注册时间',
		  	dataIndex: 'createdAt',
		  	key: 'createdAt',
		  	render: text => {
		  		if(text){
		  			let date = new Date(text)
		  			text = date.toLocaleString()
		  		}
		  		return (
		  			<span>{text}</span>
		  		)
		  	}
		}, {
		  	title: '用户组',
		  	dataIndex: 'gid',
		  	key: 'gid',
		  	render: text => {

			  	switch(text){
			  		case 1:
			  			return (
			  				<span>普通用户</span>
			  			)
			  		case 2:
			  			return (
			  				<span>管理员</span>
			  			)
			  		case 9:
			  			return (
			  				<span>系统</span>
			  			)
			  		default:
			  			return (
			  				<span>游客</span>
			  			)
			  	}
		  	}
		}, {
			title: '操作',
		  	key: 'action',
		  	render: (text, record) => (
		    	<span>

		    		{
		    			isTourist ? '' : (

								<Button 
					    			style={{
					    				margin: 8
					    			}}
					    			icon="file-text"
					    			shape="circle"
					    			onClick={()=>{
					    				onReviewUser(record.uid)
					    			}}/>

		    				)
		    		}
		    		

		    		{
		    			isRoot ?  (
		    					<Button 
		    						shape="circle"
		    						icon="edit"
					    			style={{
					    				margin: 8
					    			}}
					    			type="dashed"
						    		onClick={()=>{
						    			onEditUser(record.uid,record.gid)
						    		}}/>
					    			

		    				) : ''
		    		}

		    		{
		    			( isAdmin && record.gid===1 ) || isRoot ?  (
		    					<Button 
		    						shape="circle"
		    						icon="delete"
					    			style={{
					    				margin: 8
					    			}}
					    			type="danger"
						    		onClick={()=>{
						    			onDeleteUser(record.uid)
						    		}}/>
					    			

		    				) : ''
		    		}
		    		
		    	</span>
		  	),
		}]

		return columns
	}

	render(){

		let isTourist = this.props.userstate.group.id === 0
		let isAdmin = this.props.userstate.group.write
		let isRoot = this.props.userstate.group.root

		let users = this.props.data.users 

		const pagination = {
			total: users.length,
			showSizeChanger: true
		}
		return (

			<div className={style.root}>

				{
					this.props.data.isLoading ? (
							<div className={style['layer-loading']}>
								<Spin size="large"/>
							</div>
						) : (
							<div className={style.content}>

								<RadioButtonModal 
									title={'更改 ' + this.state.uid + ' 的用户组'}
									visible={this.state.visible}
									selected={this.state.gid}
									source={
										this.props.data.groups.map( group => {
											return ({
												id: group.id,
												text: group.name
											})
										})
									}
									onOk={ this.handleEditUserSubmit }
									onCancel={ this.handleEditUserCancel }/>


								{
									isAdmin ? (
											<Button 
												className={style.button}
												type="primary" 
												onClick={this.handleAddUser}
												icon="plus">
												添加用户
											</Button>
										) : ''
								}
								

								<Table 
									rowKey={ record => {
										return record.uid
									}}
									pagination={pagination}
									className={style.table}
									columns={this.initColumns(isTourist,isAdmin,isRoot)} 
									dataSource={users}
									/>
							</div>

						)
				}
			</div>
		)
	}

}

function select(state){
	return ({
		userstate: state.userstate,
		data: state.data
	})
}


export default connect(select)(Users)