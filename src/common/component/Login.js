import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './PublicRedux'

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            account: '',
            password: ''
        }
    }

    loginOperation() {
        let {account, password} = this.state
        let {handleLogin} = this.props.loginAction

        if (account && password) {
            handleLogin(account, password)
        }
    }
    
    render () {
        let {loginStatus} = this.props.publicState
        let {showLogin} = this.props.loginAction
        
        return (
            <div id="login">
                <div className="login-mask" onClick={ev => showLogin(false)}></div>
                <div className="login-c">
                    <div className="bar">
                        <span>手机号登录</span>
                        <i onClick={ev => showLogin(false)}></i>
                    </div>
                    <div className="form">
                        <input type="text" placeholder="请输入手机号" className="account"
                            onChange={ev => this.setState({account: ev.target.value})}
                        />
                        <input type="password" autoComplete="new-password" placeholder="请输入密码" aria-autocomplete="list" className="password"
                            onChange={ev => this.setState({password: ev.target.value})}
                        />
                        {loginStatus.code === 509 ? <p className="tip"><i className="icon-three"></i>账号或密码错误</p> : null}
                        <div className="login-btn">
                            <a href="javascript: void(0);" className="u-btn2" onClick={ev => this.loginOperation()}><i className="u-btn2">登　录</i></a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => {
        let {
            publicState
        } = state

        return {
            publicState
        }
    },
    dispatch => {
        return {
            loginAction: bindActionCreators({...actions}, dispatch)
        }
    }
)(Login)
