import React, { Component } from 'react'

export default class SongSummary extends Component {
    render() {
        return (
            <div className="song-summary">
                <div className="pic">
                    <img src="http://p2.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=150y150" alt=""/>
                    <span className="mask icon-coverall"></span>
                </div>
                <div className="info">
                    <h3>云音乐飙升榜</h3>
                    <p className="time"><i className="icon-six"></i>最近更新：12月24日 <span>（每天更新）</span></p>
                    <div className="operation">
                        <a href="javascript: void(0);" className="u-btn2 add-play"><i><em className="u-btn2 play"></em>播放</i></a>
                        <a href="javascript: void(0);" className="u-btn2 add"></a>
                        <a href="javascript: void(0);" className="u-btn2 u-btni collect"><i>(1446634)</i></a>
                        <a href="javascript: void(0);" className="u-btn2 u-btni share"><i>(1446634)</i></a>
                        <a href="javascript: void(0);" className="u-btn2 u-btni download"><i>下载</i></a>
                        <a href="javascript: void(0);" className="u-btn2 u-btni comment"><i>(1446634)</i></a>
                    </div>
                </div>
            </div>
        )
    }
}
