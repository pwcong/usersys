import React, { PropTypes } from 'react'
import { Form, Button, Input, DatePicker, Radio } from 'antd'
import moment from 'moment'
import style from './style.css'

const FormItem = Form.Item;
const RadioGroup = Radio.Group

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
      birthday = moment(date)
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
          
          {
            this.props.modifiable ? 
              getFieldDecorator('sex',{
                initialValue: sex
              })(
                <RadioGroup>
                  <Radio value={0}>未知</Radio>
                  <Radio value={1}>男</Radio>
                  <Radio value={2}>女</Radio>
                </RadioGroup>
              )
              : 
              <span>{ sex === 1 ? '男' : ( sex === 2 ? '女' : '未知') }</span>
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="生日">
          
          {
            this.props.modifiable ? 
              getFieldDecorator('birthday',{
                rules: [{ type: 'object' }],
                initialValue: birthday
              })(<DatePicker />)
              : 
              <span>{ birthday ? birthday.format('YYYY-MM-DD') : '' }</span>
          }
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

