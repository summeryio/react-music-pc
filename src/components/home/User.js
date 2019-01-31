import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {showLogin} from 'common/component/PublicRedux'

class User extends Component {
    componentWillReceiveProps(nextProps) {
        let {getUserInfo, code} = this.props

        if (code !== nextProps.code && nextProps.code === 200) {
            getUserInfo(nextProps.userId)
        }
    }

    componentDidMount() {
        let {getUserInfo, code} = this.props

        if (code === 200) {
            getUserInfo(this.props.userId)
        }
    }
    
    render() {
        let {code, userInfo, showLogin} = this.props
        
        return (
            <div className="user">
                {
                    code === 200
                    ? (
                        <div className="logined icon-five">
                            <div className="t">
                                <Link to={`user/${userInfo.userId}`} className="avatar"><img src={userInfo.avatarUrl && userInfo.avatarUrl + '?param=140y140'} /></Link>
                                <div className="info">
                                    <p className="name"><Link to={`user/${userInfo.userId}`} className="t-udl t-hide">{userInfo.nickname}</Link></p>
                                    <a href="#" className="level icon-eight">{userInfo.level}<i className="icon-eight"></i></a>
                                    <a href="#" className="u-btn2 sign"><i>签到</i></a>
                                </div>
                            </div>
                            <div className="b">
                                <a href="#"><strong>{userInfo.eventCount}</strong><span>动态</span></a>
                                <a href="#"><strong>{userInfo.follows}</strong><span>关注</span></a>
                                <a href="#"><strong>{userInfo.followeds}</strong><span>粉丝</span></a>
                            </div>
                        </div>
                    )
                    : (
                        <div className="not-login icon-five">
                            <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
                            <a href="javascript: void(0);" className="icon-five" onClick={ev => showLogin(true)}>用户登录</a>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default connect(
    state => {
        return {}
    },
    dispatch => bindActionCreators({showLogin}, dispatch)
)(User)