import React, { Component } from 'react'

export default class User extends Component {
    componentWillReceiveProps(nextProps) {
        let {getUserInfo, code} = this.props

        if (code !== nextProps.code && nextProps.code === 200) {
            getUserInfo(nextProps.userId)
        }
    }
    
    render() {
        let {code, userInfo} = this.props
        
        return (
            <div className="user">
                {
                    code === 200
                    ? (
                        <div className="logined icon-five">
                            <div className="t">
                                <a href="#" className="avatar"><img src={userInfo.avatarUrl} /></a>
                                <div className="info">
                                    <p className="name"><a href="#" className="t-udl t-hide">{userInfo.nickname}</a></p>
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
                            <a href="javascript: void(0);" className="icon-five">用户登录</a>
                        </div>
                    )
                }
            </div>
        )
    }
}
