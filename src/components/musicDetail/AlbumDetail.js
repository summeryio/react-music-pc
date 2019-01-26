import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './MusicDetailRedux'

import {formatDateYMD, formatDateHM, formatStringLine} from 'common/js/util'

import PublicModule from 'common/component/PublicModule'
import Comment from 'common/component/Comment'
import Loading from 'common/component/Loading'

class AlbumDetail extends Component {
    componentWillReceiveProps(nextProps) {
        let {id} = this.props.match.params
        let nextId = nextProps.match.params.id
        let {getAlbumDetail} = this.props.musicDetailAction

        if (id !== nextId) {
            getAlbumDetail(nextId)
        }
    }
    
    componentDidMount() {
        let {getAlbumDetail} = this.props.musicDetailAction
        let {id} = this.props.match.params

        getAlbumDetail(id)
    }
    
    render () {
        let {albumDetailData} = this.props.musicDetail
        let {id} = this.props.match.params
        let loaded = albumDetailData.code === 200
        let {songs, album} = albumDetailData
        
        return (
            <PublicModule 
                {...{
                    pageId: 'albumDetail_page',
                    navActive: '/'
                }}
            >
                <div id="main" className="g-bd">
                    <div className="main-inner">
                        <div className="summary">
                            <div className="pic">
                                <img src={loaded ? album.picUrl + '?param=178y178' : null}/>
                                <i className="icon-coverall mask"></i>
                            </div>
                            <div className="info">
                                <h3 className="title"><i className="tag icon-six"></i>{loaded && album.name}</h3>
                                {loaded && album.alias.length ? <p className="recource">{album.alias}</p> : null}
                                <p className="intro">歌手：<a href="#">{loaded && album.artist.name}</a></p>
                                <p className="intro">发行时间：{loaded && formatDateYMD(album.publishTime)}</p>
                                <p className="intro">发行公司： {loaded && album.company}</p>
                                <div className="operation">
                                    <a href="javascript: void(0);" className="u-btn2 add-play"><i><em className="u-btn2 play"></em>播放</i></a>
                                    <a href="javascript: void(0);" className="u-btn2 add"></a>
                                    <a href="javascript: void(0);" className="u-btn2 u-btni collect"><i>收藏</i></a>
                                    {
                                        loaded && album.info.shareCount > 0
                                        ? (<a href="javascript: void(0);" className="u-btn2 u-btni share"><i>({album.info.shareCount})</i></a>)
                                        : (<a href="javascript: void(0);" className="u-btn2 u-btni share"><i>分享</i></a>)
                                    }
                                    
                                    <a href="javascript: void(0);" className="u-btn2 u-btni download"><i>下载</i></a>
                                    <a href="javascript: void(0);" className="u-btn2 u-btni comment"><i>({loaded && album.info.commentThread.commentCount})</i></a>
                                </div>
                                
                            </div>
                        </div>
                        {
                            loaded
                            ? (
                                <p className="desc">
                                    <b>专辑介绍：</b>
                                    {<span dangerouslySetInnerHTML={{__html: formatStringLine(album.description || '')}}></span>}
                                </p>
                            ) : null
                        }
                        <div className="song-list">
                            <div className="top">
                                <h3>包含歌曲列表</h3>
                                <p className="sont-num">{loaded && album.size}首歌</p>
                            </div>
                            {
                                loaded
                                ? (
                                    <table id="m_table">
                                        <thead>
                                            <tr>
                                                <th className="first t1"></th>
                                                <th><p className="key">歌曲标题</p></th>
                                                <th className="t2"><p className="key">时长</p></th>
                                                <th className="t3"><p className="key">歌手</p></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                songs.map((song, i) => {
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
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                ) : (<Loading />)
                            }
                        </div>
                        {loaded ? <Comment id={id} urlType="album"/> : null}
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
)(AlbumDetail)