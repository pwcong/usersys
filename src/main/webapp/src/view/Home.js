import React, { PropTypes } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import { connect } from 'react-redux'
import { browserHistory} from 'react-router'

import style from './style/home.css'
 
const { Header, Content, Footer, Sider } = Layout

class Main extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      collapsed: false
    }

    this.onCollapse = this.onCollapse.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)

  }

  onCollapse(collapsed){
    this.setState({ collapsed })
  }

  handleMenuClick({item,key,keyPath}){
    switch(key){

      case 'overview':
        browserHistory.push('/home')
        break
      case 'users':
        browserHistory.push('/home/user')
        break
      case 'userinfo':
        browserHistory.push('/home/userinfo')

    }
  }

  render() {
    return (
      <Layout>

        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}>

          <div className={style.logo}>
            <h1>用户管理系统</h1>
          </div>

          <Menu theme="dark" mode="inline" defaultSelectedKeys={['overview']} onClick={this.handleMenuClick}>
            <Menu.Item key="overview">
              <Icon type="home" />
              <span className="nav-text">概览</span>
            </Menu.Item>
            <Menu.Item key="users">
              <Icon type="user" />
              <span className="nav-text">用户</span>
            </Menu.Item>
            <Menu.Item key="userinfo">
              <Icon type="heart-o" />
              <span className="nav-text">个人</span>
            </Menu.Item>
          </Menu>

        </Sider>

        <Layout>

          <Content className={style['content-root']}>
            <div className={style.content}>
              { this.props.children }
            </div>
          </Content>

          <Footer className={style.footer}>
            User System ©2017 Created by Pwcong
          </Footer>

        </Layout>

      </Layout>
    )
  }

  componentDidMount() {
    // if(!this.props.userstate.isLogined)
    //   browserHistory.push('/')
  }


}

function select(state){
  return ({
    userstate: state.userstate
  })
}

export default connect(select)(Main)