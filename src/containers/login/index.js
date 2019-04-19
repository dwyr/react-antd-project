import React from 'react'
import {observer} from 'mobx-react';
import PropTypes from 'prop-types'
import { Spin } from 'antd'
import LoginForm from './LoginForm'

@observer
class Login extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        loading: false,

      }
  }
  componentDidMount() {
    document.title = '登录';
  }

  onOk = async () => {
    this.props.router.push('/welcome');
  }

  render() {
    const {loading} = this.state;
    const loginProps ={onOk: this.onOk}
    return (
      <div className={'spin'}><Spin tip="加载用户信息..." spinning={loading} size="large"><LoginForm {...loginProps} /></Spin></div>
    )
  }
}

/*function Login ({ dispatch, loading = false }) {
  const loginProps = {
    loading,
    onOk (data) {
      dispatch({ type: 'login/submit', payload: data })
    },
  }
  return (
    <div className={styles.spin}><Spin tip="加载用户信息..." spinning={loading} size="large"><LoginForm {...loginProps} /></Spin></div>
  )
}*/

Login.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}

export default Login;

/*function mapStateToProps ({ loading }) {
  return { loading: loading.models.login }
}
export default connect(mapStateToProps)(Login)*/
