import React, { PropTypes } from 'react'
import { Form, Modal } from 'antd'

import style from './style.css'

const FormItem = Form.Item;

const UserInfoForm = Form.create()(React.createClass({

  render() {

    let { name, sex, birthday, phone, email, signature } = this.props.userinfo

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    }

    return (
      <Form className={style.form}>
        <FormItem
          {...formItemLayout}
          label="姓名">
          <span>{name}</span>
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
          <span>{phone}</span>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="邮箱">
          <span>{email}</span>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="签名">
          <span>{signature}</span>
        </FormItem>
      </Form>
    )
  }
}))


UserInfoForm.propTypes = {
  userinfo: PropTypes.object

}

UserInfoForm.defaultProps = {
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

