import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './MusicDetailRedux'

import {formatDateYMD, formatDateHM, formatStringLine} from 'common/js/util'

import PublicModule from 'common/component/PublicModule'
import Comment from 'common/component/Comment'
import Loading from 'common/component/Loading'

class PlayDetail extends Component {
    componentWillReceiveProps(nextProps) {
        let {id} = this.props.match.params
        let nextId = nextProps.match.params.id
        let {getPlayListData} = this.props.musicDetailAction

        if (id !== nextId) {
            getPlayListData(nextId)
        }
    }
    
    componentDidMount() {
        let {getPlayListData} = this.props.musicDetailAction
        let {id} = this.props.match.params

        getPlayListData(id)
    }
    
    render () {
        let {playDetailData} = this.props.musicDetail
        let {id} = this.props.match.params

        return (
            <PublicModule 
                {...{
                    pageId: 'playDetail_page',
                    navActive: '/'
                }}
            >
                <div id="main" className="g-bd">
                    <div className="main-inner">
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
            </PublicModule>
        )
    }
}

export default connect(
    state => {
        let {
            musicDetail
        } = state

        return {
            musicDetail
        }
    },
    dispatch => {
        return {
            musicDetailAction: bindActionCreators({...actions}, dispatch)
        }
    }
)(PlayDetail)