import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './MusicDetailRedux'

import PublicModule from 'common/component/PublicModule'
import Comment from 'common/component/Comment'

class SongDetail extends Component {
    componentWillReceiveProps(nextProps) {
        let {id} = this.props.match.params
        let nextId = nextProps.match.params.id
        let {getSongDetail, getLyric} = this.props.musicDetailAction

        if (id !== nextId) {
            getSongDetail(nextId)
            getLyric(nextId)
        }
    }
    
    componentDidMount() {
        let {getSongDetail, getLyric} = this.props.musicDetailAction
        let {id} = this.props.match.params

        getSongDetail(id)
        getLyric(id)
    }
    
    render () {
        let {songDetailData, lyric} = this.props.musicDetail
        let {commentData} = this.props.publicState
        let {id} = this.props.match.params
        let {ar, al} = songDetailData

        return (
            <PublicModule 
                {...{
                    pageId: 'songDetail_page',
                    navActive: '/'
                }}
            >
                <div id="main" className="g-bd">
                    <div className="main-inner">
                        <div className="summary">
                            <div className="pic">
                                {<img src={al && al.picUrl + '?param=130y130'} />}
                                <span className="icon-coverall mask"></span>
                            </div>
                            <div className="info">
                                <h3 className="title">
                                    <i className="tag icon-six"></i>
                                    {songDetailData.name}
                                    {
                                        songDetailData.mv
                                        ? (<Link to={`/mvDetail/${songDetailData.mv}`} title="播放mv" className="mv"><i className="icon-six"></i></Link>)
                                        : null
                                    }
                                </h3>
                                <p className="recource">{songDetailData.alia}</p>
                                <p className="singer">歌手：<a href="#">{ar && ar[0].name}</a></p>
                                <p className="singer">所属专辑：{al && <Link to={`/albumDetail/${al.id}`}>{al.name}</Link>}</p>
                                <div className="operation">
                                    <a href="javascript: void(0);" className="u-btn2 add-play"><i><em className="u-btn2 play"></em>播放</i></a>
                                    <a href="javascript: void(0);" className="u-btn2 add"></a>
                                    <a href="javascript: void(0);" className="u-btn2 u-btni collect"><i>收藏</i></a>
                                    <a href="javascript: void(0);" className="u-btn2 u-btni share"><i>分享</i></a>
                                    <a href="javascript: void(0);" className="u-btn2 u-btni download"><i>下载</i></a>
                                    <a href="javascript: void(0);" className="u-btn2 u-btni comment"><i>({commentData.total})</i></a>
                                </div>
                                {
                                    lyric ? <p className="lyric" dangerouslySetInnerHTML={{__html: lyric}}></p> : null
                                }
                            </div>
                        </div>
                        {Object.keys(songDetailData).length ? <Comment id={id} urlType="music"/> : null}
                    </div>
                </div>
            </PublicModule>
        )
    }
}

export default connect(
    state => {
        let {
            musicDetail,
            publicState
        } = state

        return {
            musicDetail,
            publicState
        }
    },
    dispatch => {
        return {
            musicDetailAction: bindActionCreators({...actions}, dispatch)
        }
    }
)(SongDetail)