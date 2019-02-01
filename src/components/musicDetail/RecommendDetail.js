import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './MusicDetailRedux'

import {formatDateHM} from 'common/js/util'

import PublicModule from 'common/component/PublicModule'
import Loading from 'common/component/Loading'


class RecommendDetail extends Component {
    componentDidMount() {
        let {getRecommend} = this.props.musicDetailAction
        
        getRecommend()
    }
    
    render () {
        let {recommendDetail} = this.props.musicDetail
        let loaded = Object.keys(recommendDetail).length > 0
        let recommends = loaded ? recommendDetail.recommend : []
        let week = ['Sunday', 'Monday', 'Tuesday', 'Wendsday', 'Thursday', 'Friday', 'Saturday']
        let nowDate = new Date()

        return (
            <PublicModule 
                {...{
                    pageId: 'recommendDetail_page',
                    navActive: '/'
                }}
            >
                <div id="main" className="g-bd">
                    <div className="main-inner">
                        <div className="summary">
                            <div className="date icon-date">
                                <p className="week">{week[nowDate.getDay()]}</p>
                                <p className="day">{nowDate.getDate()}</p>
                                <span className="mask icon-date"></span>
                            </div>
                        </div>
                        <div className="song-list">
                            <div className="top">
                                <h3>歌曲列表</h3>
                                <p className="sont-num">{recommends.length}首歌</p>
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
                                                <th className="t4"><p className="key">专辑</p></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                recommends.length && recommends.map((song, i) => {
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
                                                                            song.alias.length ? (<em className="tip"> - ({song.alias[0]})</em>) : null
                                                                        }
                                                                        {
                                                                            song.mvid ? (<Link to={`/mvDetail/${song.mvid}`}><i className="icon-table mv"></i></Link>) : null
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td className="time">
                                                                <span>{formatDateHM(song.duration)}</span>
                                                                <div className="oper">
                                                                    <a href="javascript: void(0);" className="icon-six add"></a>
                                                                    <a href="javascript: void(0);" className="collect"></a>
                                                                    <a href="javascript: void(0);" className="share"></a>
                                                                    <a href="javascript: void(0);" className="download"></a>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="t-hide singer">
                                                                    
                                                                    {
                                                                        song.artists.map((artist, a) => {
                                                                            return (
                                                                                <span key={artist.id}>
                                                                                    <Link to={`/artist/${artist.id}`} className="t-udl">{artist.name}</Link>
                                                                                    {a === song.artists.length - 1 ? '' : '/'}
                                                                                </span>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td><div className="t-hide album"><Link to={`/albumDetail/${song.album.id}`} className="t-udl">{song.album.name}</Link></div></td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                ) : (<Loading />)
                            }
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
)(RecommendDetail)