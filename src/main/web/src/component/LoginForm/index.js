import React, { PropTypes } from 'react'

import { Form, Icon, Input, Button, Alert } from 'antd'

import style from './style.css'

const FormItem = Form.Item

const LoginForm = Form.create()(React.createClass({

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values)
      }
    })
  },
  handleToRegister(){
    this.props.onToRegister()
  },
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className={style['login-form']}>

        <FormItem>
          {getFieldDecorator('uid', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="用户名" />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('pwd', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="密码" />
          )}
        </FormItem>

        {
          this.props.isError ? (
              <Alert message={this.props.message}
                type="error"
                closable
              />
            ) : ''
        }

        <FormItem>

          <Button type="primary" htmlType="submit" className={style['login-form-button']} loading={this.props.isLogining}>
            登陆
          </Button>
          没有账号？ <a onClick={this.handleToRegister}>注册用户</a>
        </FormItem>

      </Form>
    )
  },
}))

LoginForm.propTypes = {
  message: PropTypes.string,
  isError: PropTypes.bool,
  isLogining: PropTypes.bool,
  onSubmit: PropTypes.func,
  onToRegister: PropTypes.func

}

LoginForm.defaultProps = {

  message: '',
  isError: false,
  isLogining: false,
  onSubmit(values){
    console.log(values)
  },
  onToRegister(){
    console.log('To Register')
  }

}

export default LoginForm