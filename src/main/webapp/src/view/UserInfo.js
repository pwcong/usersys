import React, { PropTypes } from 'react'
import style from './style/userinfo.css'
import { connect } from 'react-redux'
import { Spin, notification, Icon, Button, message } from 'antd'
import UserInfoForm from '../component/UserInfoForm'
import { toGetUserInfo, toModifyUserInfo } from '../actions/data'

class UserInfo extends React.Component{

	constructor(props) {

		super(props)

		this.state = {
			modifiable: false
		}
		
		this.componentDidMount = this.componentDidMount.bind(this)
		this.handleEditUserInfo = this.handleEditUserInfo.bind(this)
	}

	handleEditUserInfo(values){

		let { token, user } = this.props.userstate

		this.props.dispatch(toModifyUserInfo(
			token,
			user,
			values,
			() => {
				message.success("修改成功")
				this.setState({
					modifiable: false
				})
			},
			error => {
				message.error(error)
			}
		))

	}

	componentDidMount() {
		this.props.dispatch(toGetUserInfo(
			this.props.userstate.token,
			this.props.userstate.user.uid,
			error => {
					notification.open({
			    	message: '个人信息获取失败',
			    	description: error,
			    	icon: <Icon type="frown-o" style={{ color: '#108ee9' }} />,
				});
			}
		))
	}

	render(){

		return (

			<div className={style.root}>
				{
					this.props.data.isLoading ? (
							<div className={style['layer-loading']}>
								<Spin size="large"/>
							</div>
						) : (
							<div className={style['content-root']}>

								{
									this.state.modifiable ? (
											<div className={style['tools-left']}>
												<Button 
													icon="left" 
													onClick={() => {
														this.setState({
															modifiable: false
														})
													}}>
													返回
												</Button>
											</div>
										) : (
											<div className={style['tools-right']}>
												<Button 
													type="primary" 
													icon="edit" 
													onClick={() => {
														this.setState({
															modifiable: true
														})
													}}>
													修改
												</Button>
											</div>
										)
								}
								
					
								
								<div className={style.content}>
									<UserInfoForm 
										onSubmit={this.handleEditUserInfo}
										isModifying={this.props.data.isModifying}
										modifiable={this.state.modifiable}
										userinfo={this.props.data.userinfo}/>
								</div>
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

export default connect(select)(UserInfo)
