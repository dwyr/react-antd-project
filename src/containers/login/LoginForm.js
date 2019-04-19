import React from 'react'
import PropTypes from 'prop-types'
import {Button, Form, Icon, Input, Checkbox} from 'antd'
import QueueAnim from 'rc-queue-anim'
import config  from './config'

const FormItem = Form.Item

const Login = ({
  loading,
  onOk,
  autoLogin,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  function handleOk (e) {
    e.preventDefault()
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      console.log(onOk, '90')
      onOk(values)
    })
  }

  function changeAutoLogin() {

  }

  return (
    <div className={'form'}>
      <QueueAnim delay={200} type="top">
        <div className={'logo'} key="1">
          <img src={config.logoSrc} alt={config.logoSrc} />
          <span>{config.logoText}</span>
        </div>
      </QueueAnim>
      <form onSubmit={handleOk}>
        <QueueAnim delay={200} type="top">
          <FormItem hasFeedback key="1">
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                message: '请输入用户名！',
                },
              ],
            })(<Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />)}
          </FormItem>
          <FormItem hasFeedback key="2">
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入密码！',
                },
              ],
            })(<Input size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}  type="password" placeholder="密码" />)}
          </FormItem>
          <FormItem key="3">
            <Checkbox checked={autoLogin} stye={{'fontWeight':'400'}} onChange={changeAutoLogin}>
              <span stye={{'fontWeight':'400'}}>记住</span>
            </Checkbox>
            <Button type="primary" htmlType="submit" size="large" loading={loading}>
              登录
            </Button>
          </FormItem>
        </QueueAnim>
      </form>
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
}

export default Form.create()(Login)
