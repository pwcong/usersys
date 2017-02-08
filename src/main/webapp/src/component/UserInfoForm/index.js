import React, { PropTypes } from 'react'
import { Form, Button, Input } from 'antd'

import style from './style.css'

const FormItem = Form.Item;

const UserInfoForm = Form.create()(React.createClass({


  handleSubmit(e){
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSubmit(values)
      }
    });
  },
  render() {

    const { getFieldDecorator } = this.props.form

    let { name, sex, birthday, phone, email, signature } = this.props.userinfo

    if(birthday){
      let date = new Date(birthday)
      birthday = date.toLocaleString().split(' ')[0]
    }
    

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
      <Form onSubmit={this.handleSubmit} className={style.form}>
        <FormItem
          {...formItemLayout}
          label="姓名">
          {
            this.props.modifiable ? 
              getFieldDecorator('name',{
                initialValue: name
              })(<Input />)
              : 
              <span>{name}</span>
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="性别">
          <span>{ sex === 1 ? '男' : ( sex === 2 ? '女' : '未知') }</span>

        </FormItem>
        <FormItem
          {...formItemLayout}
          label="生日">
          <span>{birthday}</span>
          
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="手机">
          {
            this.props.modifiable ? 
              getFieldDecorator('phone',{
                initialValue: phone
              })(<Input />)
              : 
              <span>{phone}</span>
          }
          
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="邮箱">
          {
            this.props.modifiable ? 
              getFieldDecorator('email',{
                initialValue: email
              })(<Input />)
              : 
              <span>{email}</span>
          }
          
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="签名">
          {
            this.props.modifiable ? 
              getFieldDecorator('signature',{
                initialValue: signature
              })(<Input />)
              : 
              <span>{signature}</span>
          }
          
        </FormItem>

        {
          this.props.modifiable ? (
            <FormItem {...tailFormItemLayout}>
              <Button 
                htmlType="submit"
                loading={this.props.isModifying} 
                type="primary" 
                size="large" 
                className={style['form-button']}>
                提交
              </Button>        
            </FormItem>
            ) : ''
        }

      </Form>
    )
  }
}))


UserInfoForm.propTypes = {
  isModifying: PropTypes.bool,
  onSubmit: PropTypes.func,
  userinfo: PropTypes.object,
  modifiable: PropTypes.bool
}

UserInfoForm.defaultProps = {
  isModifying: false,
  onSubmit(values){
    console.log(values)
  },
  modifiable: false,
  userinfo: {
    name: '',
    birthday: '',
    sex: 0,
    email: '',
    signature: '',
    phone: ''
  }
}


export default UserInfoForm

