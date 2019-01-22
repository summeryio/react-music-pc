import React, { Component } from 'react'
import {formatDate} from 'common/js/util'

export default class SongSummary extends Component {
    render() {
        let {playList, updateFrequency} = this.props
        
        return (
            <div className="song-summary">
                <div className="pic">
                    <img src={playList.coverImgUrl && playList.coverImgUrl + '?param=150y150'} />
                    <span className="mask icon-coverall"></span>
                </div>
                <div className="info">
                    <h3>{playList.name}</h3>
                    <p className="time"><i className="icon-six"></i>最近更新：{formatDate(playList.updateTime)} <span>（{updateFrequency}）</span></p>
                    <div className="operation">
                        <a href="javascript: void(0);" className="u-btn2 add-play"><i><em className="u-btn2 play"></em>播放</i></a>
                        <a href="javascript: void(0);" className="u-btn2 add"></a>
                        <a href="javascript: void(0);" className="u-btn2 u-btni collect"><i>({playList.subscribedCount})</i></a>
                        <a href="javascript: void(0);" className="u-btn2 u-btni share"><i>({playList.shareCount})</i></a>
                        <a href="javascript: void(0);" className="u-btn2 u-btni download"><i>下载</i></a>
                        <a href="javascript: void(0);" className="u-btn2 u-btni comment"><i>({playList.commentCount})</i></a>
                    </div>
                </div>
            </div>
        )
    }
}
