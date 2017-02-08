import React, { PropTypes } from 'react'
import { Layout, Menu, Icon, Dropdown } from 'antd'
import { connect } from 'react-redux'
import { browserHistory} from 'react-router'
import { logout } from '../actions/userstate'
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
    this.handleLogout = this.handleLogout.bind(this)
  }

  onCollapse(collapsed){
    this.setState({ collapsed })
  }

  handleMenuClick({item,key,keyPath}){
    switch(key){

      case 'overview':
        browserHistory.push('/home')
        break
      case 'user':
        browserHistory.push('/home/user')
        break
      case 'mine':
        browserHistory.push('/home/mine')

    }
  }

  handleLogout(){
    this.props.dispatch(logout())
    browserHistory.push("/")
  }

  render() {

    const menu = (
        <Menu>
          <Menu.Item>
            <a href="" onClick={this.handleLogout}>退出</a>
          </Menu.Item>
        </Menu>

      )


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
            <Menu.Item key="user">
              <Icon type="user" />
              <span className="nav-text">用户</span>
            </Menu.Item>
            <Menu.Item key="mine">
              <Icon type="heart-o" />
              <span className="nav-text">个人</span>
            </Menu.Item>
          </Menu>

        </Sider>

        <Layout>

          <Header className={style.header}>

            <Dropdown overlay={menu}>
              <a href="#">
                欢迎您，{this.props.userstate.user.uid}
              </a>
            </Dropdown>


          </Header>

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
    if(!this.props.userstate.isLogined)
      browserHistory.push('/')
  }


}

function select(state){
  return ({
    userstate: state.userstate
  })
}

export default connect(select)(Main)