import React, { PropTypes } from 'react'
import { Form, Input, Button, Alert } from 'antd'

import style from './style.css'

const FormItem = Form.Item;

const RegisterForm = Form.create()(React.createClass({
  getInitialState() {
    return {
      passwordDirty: false
    };
  },
  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSubmit(values)
      }
    });
  },
  handlePasswordBlur(e) {
    const value = e.target.value
    this.setState({ passwordDirty: this.state.passwordDirty || !!value })
  },
  checkPassword(rule, value, callback) {
    const form = this.props.form
    if (value && value !== form.getFieldValue('pwd')) {
      callback('密码和验证密码不一致!')
    } else {
      callback()
    }
  },
  checkConfirm(rule, value, callback) {
    const form = this.props.form
    if (value && this.state.passwordDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  },
  handleToLogin(){
    this.props.onToLogin()
  },
  render() {

    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    }

    const tailFormItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 6,
      }
    }


    return (
      <Form onSubmit={this.handleSubmit} className={style['register-form']}>
        <FormItem
          {...formItemLayout}
          label="用户名"
          hasFeedback
        >
          {getFieldDecorator('uid', {
            rules: [{
              required: true, message: '请输入用户名！',
            }],
          })(
            <Input placeholder="不少于6位"/>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="密码"
          hasFeedback
        >
          {getFieldDecorator('pwd', {
            rules: [{
              required: true, message: '请输入密码!',
            }, {
              validator: this.checkConfirm,
            }],
          })(
            <Input type="password" onBlur={this.handlePasswordBlur} placeholder="不少于6位" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="验证密码"
          hasFeedback
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请再次输入密码！',
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input type="password" placeholder="请再次输入密码"/>
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


        <FormItem {...tailFormItemLayout}>
          <Button loading={this.props.isRegisting} type="primary" htmlType="submit" size="large" className={style['register-form-button']}>注册</Button>
          {
            this.props.canBackToLogin ? (
                <span>
                  已有账号？ <a onClick={this.handleToLogin}>登陆用户</a>        
                </span>
              ) : ''
          }
          
        </FormItem>
      </Form>
    )
  }
}))


RegisterForm.propTypes = {
  canBackToLogin: PropTypes.bool,
  message: PropTypes.string,
  isError: PropTypes.bool,
  isRegisting: PropTypes.bool,
  onSubmit: PropTypes.func,
  onToLogin: PropTypes.func


}

RegisterForm.defaultProps = {
  canBackToLogin: false,
  message: '',
  isError: false,
  isRegisting: false,
  onSubmit(values){
    console.log(values)
  },
  onToLogin(){
    console.log("To Login")
  }
}

export default RegisterForm

