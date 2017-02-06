import React, { PropTypes } from 'react'
import style from './style/overview.css'
import { connect } from 'react-redux'
import { Card, Spin, notification, Icon } from 'antd'
import { getUsersAndGroups } from '../actions/data'

class Overview extends React.Component{

	constructor(props) {

		super(props)
		
		this.componentDidMount = this.componentDidMount.bind(this)

	}

	componentDidMount() {
		this.props.dispatch(getUsersAndGroups(
			this.props.userstate.token,
			error => {
					notification.open({
			    	message: '系统概览获取失败',
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

							<Card style={{ width: 240 }} bodyStyle={{ padding: 0 }}>

								<div className={style['card-img']}>
									<img src="/public/imgs/user.jpg" alt="Image"/>
								</div>
								<div className={style['card-content']}>
									<h1>用户数：{this.props.data.users.length}</h1>
								</div>

							</Card>

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

export default connect(select)(Overview)
