import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './UserRedux'

import PublicModule from 'common/component/PublicModule'
import Loading from 'common/component/Loading'

class User extends Component {
    constructor(props) {
        super(props)
    }
    
    componentDidMount() {
        let {getUserInfo, getPlayList} = this.props.userAction
        let {id} = this.props.match.params

        getUserInfo(id)
        getPlayList(id)
    }
    
    render () {
        let {userInfo, playlist} = this.props.user
        let playListTemp = playlist.length > 0 ? playlist.map(data => {
            let playCount = data.playCount > 100000 ? parseInt(data.playCount / 10000) + '万' : parseInt(data.playCount)
            
            return (
                <li key={data.id}>
                    <div className="pic">
                        <img src={data.coverImgUrl + '?param=140y140'} alt={data.name} />
                        <Link to={`/playDetail/${data.id}`} title={data.name} className="mask icon-coverall"></Link>
                        <p className="info icon-coverall">
                            <span className="icon-seven"></span>
                            <span className="num">{playCount}</span>
                            <a href="javascript:;" className="icon-seven play"></a>
                        </p>
                    </div>
                    <p className="desc">
                        <Link to={`/playDetail/${data.id}`} title={data.name} className="t-udl t-hide">{data.name}</Link>
                    </p>
                </li>
            )
        }) : null
        let userLoaded = Object.keys(userInfo).length > 0 ? true : false
        let userProfile = userInfo.profile ? userInfo.profile : {}

        return (
            <PublicModule 
                {...{
                    pageId: 'user_page'
                }}
            >
                <div id="main" className="g-bd">
                    <div className="main-inner">
                        <div className="user-info">
                            <div className="pic fl"><img src={userProfile.avatarUrl && userProfile.avatarUrl + '?param=180y180'}/></div>
                            <div className="info">
                                <h2 className="name">
                                    {userProfile.nickname}
                                    <span className="icon-eight level">{userInfo.level}<i className="icon-eight"></i></span>
                                    <i className={`icon-three gender ${userProfile.gender === 1 ? '' : 'gender-woman'}`}></i>
                                </h2>
                                <div className="data">
                                    <a href="#"><strong>{userProfile.eventCount}</strong><span>动态</span></a>
                                    <a href="#"><strong>{userProfile.follows}</strong><span>关注</span></a>
                                    <a href="#"><strong>{userProfile.followeds}</strong><span>粉丝</span></a>
                                </div>
                                <p className="desc">个人介绍：{userProfile.signature}</p>
                            </div>
                        </div>
                        <div className="title">
                            <h3>{userLoaded && userInfo.profile.nickname}的歌单</h3>
                        </div>
                        <div className="content">
                            <ul className="play-list clearfix">{playListTemp || <Loading />}</ul>
                        </div>
                    </div>
                </div>
            </PublicModule>
        )
    }
}

export default connect(
    state => {
        let {
            user
        } = state

        return {
            user
        }
    },
    dispatch => {
        return {
            userAction: bindActionCreators({...actions}, dispatch)
        }
    }
)(User)