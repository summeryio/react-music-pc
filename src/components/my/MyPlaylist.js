import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from './MyRedux'

import {formatDateYMD, formatDateHM, formatStringLine} from 'common/js/util'

import PublicModule from 'common/component/PublicModule'
import Comment from 'common/component/Comment'
import Loading from 'common/component/Loading'

class MyPlaylist extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fixed: false
        }

        this.bindScroll = this.bindScroll.bind(this)
    }

    bindScroll(ev) {
        let scrollTop = (ev.srcElement ? ev.srcElement.documentElement.scrollTop : false) || window.pageYOffset || (ev.srcElement ? ev.srcElement.body.scrollTop : false)
        let clientH = (ev.srcElement ? ev.srcElement.documentElement.clientHeight : false) || document.body.clientHeight
        let scrollH = (ev.srcElement ? ev.srcElement.documentElement.scrollHeight : false) || document.body.scrollHeight
        let {total_collect} = this.refs

        if (scrollTop > 75) {
            this.setState({
                fixed: true
            })
        } else {
            this.setState({
                fixed: false
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        let {id} = this.props.match.params
        let nextId = nextProps.match.params.id
        let {getPlayListData} = this.props.myAction

        if (id !== nextId) {
            getPlayListData(nextId)
        }
    }

    componentDidMount() {
        let {getPlaylist, getPlayListData} = this.props.myAction
        let {id} = this.props.match.params
        let {userId} = JSON.parse(sessionStorage.getItem('data'))

        getPlaylist(userId)
        getPlayListData(id)

        window.addEventListener('scroll', this.bindScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.bindScroll)
        this.setState = (state, callback) => {
            return
        }
    }

    render() {
        let {subcount, playlist} = this.props.my
        let {playDetailData} = this.props.my
        let {id} = this.props.match.params

        return (
            <PublicModule 
                {...{
                    pageId: 'my_page',
                    navActive: '/my'
                }}
            >
                {
                    this.context.user.code === 200
                    ? (
                        <div id="main" className="g-bd my-bd clearfix">
                            <div className="main-siderBar">
                                <div className={`total-collect ${this.state.fixed ? 'fixed' : ''}`} ref="total_collect">
                                    {
                                        /* subcount.artistCount > 0
                                        ? (
                                            <h4 className="item item-singer">
                                                <a href="#">我的歌手({subcount.artistCount})</a>
                                            </h4>
                                        ) : null */
                                    }
                                    {
                                        /* subcount.mvCount > 0
                                        ? (
                                            <h4 className="item item-mv">
                                                <a href="#">我的视频({subcount.mvCount})</a>
                                            </h4>
                                        ) : null */
                                    }
                                    <div className="playlist">
                                        {/* <h4 className="item">
                                            <a href="javascript: void(0);"><i className="icon-arrow icon-folded"></i>我的歌单</a>
                                        </h4> */}
                                        <ul className="list">
                                            {
                                                playlist.map(play => {
                                                    return (
                                                        <li key={play.id} className={play.id === parseInt(id) ? 'active' : ''}>
                                                            <div className="pic"><img src={play.coverImgUrl} /></div>
                                                            <div className="info">
                                                                <p className="name t-hide" title={play.name}>{play.name}</p>
                                                                <p className="author t-hide">{play.trackCount}首</p>
                                                            </div>
                                                            <Link to={`/my/playlist/${play.id}`} className="link"></Link>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="main-content">
                                <div className="summary">
                                    <div className="pic"><img src={playDetailData.coverImgUrl && playDetailData.coverImgUrl + '?param=200y200'}/></div>
                                    <div className="info">
                                        <h3 className="title"><i className="icon-six"></i>{playDetailData.name}</h3>
                                        {
                                            Object.keys(playDetailData).length > 0
                                            ? (
                                                <p className="creater">
                                                    <a href="#" className="avatar"><img src={playDetailData.creator.avatarUrl + '?param=40y40'} alt={playDetailData.creator.nickname}/></a>
                                                    <a href="#" className="t-udl name">{playDetailData.creator.nickname}</a>
                                                    <span className="time">{formatDateYMD(playDetailData.createTime)} 创建</span>
                                                </p>
                                            ) : null
                                        }
                                        <div className="operation">
                                            <a href="javascript: void(0);" className="u-btn2 add-play"><i><em className="u-btn2 play"></em>播放</i></a>
                                            <a href="javascript: void(0);" className="u-btn2 add"></a>
                                            <a href="javascript: void(0);" className="u-btn2 u-btni collect"><i>({playDetailData.subscribedCount})</i></a>
                                            <a href="javascript: void(0);" className="u-btn2 u-btni share"><i>({playDetailData.shareCount})</i></a>
                                            <a href="javascript: void(0);" className="u-btn2 u-btni download"><i>下载</i></a>
                                            <a href="javascript: void(0);" className="u-btn2 u-btni comment"><i>({playDetailData.commentCount})</i></a>
                                        </div>
                                        {
                                            (Object.keys(playDetailData).length > 0 && playDetailData.tags.length > 0)
                                            ? (
                                                <dl className="tag">
                                                    <dt>标签：</dt>
                                                    {
                                                        playDetailData.tags.map((tag, t) => {
                                                            return (<dd key={t}><Link to={`/discover/playList/${tag}`}>{tag}</Link></dd>)
                                                        })
                                                    }
                                                </dl>
                                            ) : null
                                        }
                                        {
                                            (Object.keys(playDetailData).length > 0 && playDetailData.description)
                                            ? (
                                                <p className="desc">
                                                    <b>介绍：</b>
                                                    {<span dangerouslySetInnerHTML={{__html: formatStringLine(playDetailData.description || '')}}></span>}
                                                </p>
                                            ) : null
                                        }
                                    </div>
                                </div>
                                <div className="song-list">
                                    <div className="top">
                                        <h3>歌曲列表</h3>
                                        <p className="sont-num">{playDetailData.trackCount}首歌</p>
                                        <p className="play-num">播放：<span>{playDetailData.playCount}</span>次</p>
                                    </div>
                                    {
                                        Object.keys(playDetailData).length
                                        ? (
                                            <table id="m_table">
                                                <thead>
                                                    <tr>
                                                        <th className="first t1"></th>
                                                        <th><p className="key">歌曲标题</p></th>
                                                        <th className="t2"><p className="key">时长</p></th>
                                                        <th className="t3"><p className="key">歌手</p></th>
                                                        <th className="t4"><p className="key">专辑</p></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        Object.keys(playDetailData).length > 0 ? playDetailData.tracks.map((song, i) => {
                                                            let even = i % 2 === 0 ? 'even' : ''
                                                            
                                                            return (
                                                                <tr className={even} key={song.id}>
                                                                    <td>
                                                                        <span className="no">{i + 1}</span>
                                                                        <i className="play"></i>
                                                                    </td>
                                                                    <td className="title">
                                                                        <div className="ttc">   
                                                                            <span className="t-hide text">
                                                                                <Link to={`/songDetail/${song.id}`} className="t-udl name">{song.name}</Link>
                                                                                {
                                                                                    song.alia.length ? (<em className="tip"> - ({song.alia[0]})</em>) : null
                                                                                }
                                                                                {
                                                                                    song.mv ? (<Link to={`/mvDetail/${song.mv}`}><i className="icon-table mv"></i></Link>) : null
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </td>
                                                                    <td className="time">
                                                                        <span>{formatDateHM(song.dt)}</span>
                                                                        <div className="oper">
                                                                            <a href="javascript: void(0);" className="icon-six add"></a>
                                                                            <a href="javascript: void(0);" className="collect"></a>
                                                                            <a href="javascript: void(0);" className="share"></a>
                                                                            <a href="javascript: void(0);" className="download"></a>
                                                                        </div>
                                                                    </td>
                                                                    <td><div className="t-hide singer"><a href="#" className="t-udl">{song.ar[0].name}</a></div></td>
                                                                    <td><div className="t-hide album"><Link to={`/albumDetail/${song.al.id}`} className="t-udl">{song.al.name}</Link></div></td>
                                                                </tr>
                                                            )
                                                        }) : null
                                                    }
                                                </tbody>
                                            </table>
                                        ) : (<Loading />)
                                    }
                                </div>
                                {Object.keys(playDetailData).length ? <Comment id={id} urlType="playlist"/> : null}
                            </div>
                        </div>
                    ) : <p>未登录</p>
                }
            </PublicModule>
        )
    }
}

MyPlaylist.contextTypes = {
    user: PropTypes.object
}

export default connect(
    state => {
        let {
            my
        } = state

        return {
            my
        }
    },
    dispatch => {
        return {
            myAction: bindActionCreators({...actions}, dispatch)
        }
    }
)(MyPlaylist)