import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Loading from 'common/component/Loading'

import {formatDateHM} from 'common/js/util'

export default class SongList extends Component {
    render() {
        let {playList, playListLoaded} = this.props
        
        return (
            <div className="song-list">
                <div className="top">
                    <h3>歌曲列表</h3>
                    <p className="sont-num">{playList.trackCount}首歌</p>
                    <p className="play-num">播放：<span>{playList.playCount}</span>次</p>
                </div>
                <div className="cont">
                    {
                        playListLoaded
                        ? (
                            <table id="m_table">
                                <thead>
                                    <tr>
                                        <th className="first t1"></th>
                                        <th><p className="key">标题</p></th>
                                        <th className="t2"><p className="key">时长</p></th>
                                        <th className="t3"><p className="key">歌手</p></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Object.keys(playList).length ? playList.tracks.map((song, i) => {
                                            let top = i < 3 ? 'no-top' : ''
                                            let even = i % 2 === 0 ? 'even' : ''
                                            
                                            return (
                                                <tr className={`${top} ${even}`} key={song.id}>
                                                    <td>
                                                        <span className="no">{i + 1}</span>
                                                        {/* <i className="icon-six status-down">32</i> */}
                                                    </td>
                                                    <td className="title">
                                                        {
                                                            i < 3 ? (<Link to={`/songDetail/${song.id}`} className="pic"><img src={song.al.picUrl + '?param=50y50'} alt=""/></Link>) : null
                                                        }
                                                        <div className="ttc">
                                                            <i className="play"></i>
                                                            <span className="t-hide text">
                                                                <Link to={`/songDetail/${song.id}`} className="t-udl name">{song.name}</Link>
                                                                {
                                                                    song.alia.length ? (<em className="tip"> - ({song.alia[0]})</em>) : null
                                                                }
                                                                {
                                                                    song.mv ? (<i className="icon-table mv"></i>) : null
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
                                        }) : null
                                    }
                                </tbody>
                            </table>
                        )
                        : (<Loading />)
                    }
                </div>
            </div>
        )
    }
}
