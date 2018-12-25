import React, { Component } from 'react'

export default class SongList extends Component {
    render() {
        return (
            <div className="song-list">
                <div className="top">
                    <h3>歌曲列表</h3>
                    <p className="sont-num">99首歌</p>
                    <p className="play-num">播放：<span>1541570304</span>次</p>
                </div>
                <div className="cont">
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
                            <tr className="even">
                                <td>
                                    <span className="no">1</span>
                                    <i className="icon-six status"></i>
                                </td>
                                <td className="title">
                                    <div>
                                        <a href="#" className="pic"><img src="http://p2.music.126.net/ItdXJn0S2HknmSLKPOHYyw==/109951163739049215.jpg?param=50y50&quality=100" alt=""/></a>
                                        <i className="play play-active"></i>
                                        <a href="#" className="name">When It's Christmas</a>
                                    </div>
                                </td>
                                <td className="time">
                                    <span>03:36</span>
                                    <div className="oper">
                                        <a href="javascript: void(0);" className="add"></a>
                                        <a href="javascript: void(0);" className="collect"></a>
                                        <a href="javascript: void(0);" className="share"></a>
                                        <a href="javascript: void(0);" className="download"></a>
                                    </div>
                                </td>
                                <td><a href="#">张艺兴</a></td>
                            </tr>
                            <tr>
                                <td>
                                    <span className="no">1</span>
                                    <i className="icon-six status"></i>
                                </td>
                                <td>
                                    <div className="title">
                                        <a href="#" className="pic"><img src="http://p2.music.126.net/ItdXJn0S2HknmSLKPOHYyw==/109951163739049215.jpg?param=50y50&quality=100" alt=""/></a>
                                        <i className="play play-active"></i>
                                        <a href="#" className="name">When It's Christmas</a>
                                    </div>
                                </td>
                                <td className="time">
                                    <span>03:36</span>
                                    <div className="oper">
                                        <a href="javascript: void(0);" className="add"></a>
                                        <a href="javascript: void(0);" className="collect"></a>
                                        <a href="javascript: void(0);" className="share"></a>
                                        <a href="javascript: void(0);" className="download"></a>
                                    </div>
                                </td>
                                <td><a href="#">张艺兴</a></td>
                            </tr>
                            <tr className="even">
                                <td>
                                    <span className="no">1</span>
                                    <i className="icon-six status"></i>
                                </td>
                                <td>
                                    <div className="title">
                                        <a href="#" className="pic"><img src="http://p2.music.126.net/ItdXJn0S2HknmSLKPOHYyw==/109951163739049215.jpg?param=50y50&quality=100" alt=""/></a>
                                        <i className="play play-active"></i>
                                        <a href="#" className="name">When It's Christmas</a>
                                    </div>
                                </td>
                                <td className="time">
                                    <span>03:36</span>
                                    <div className="oper">
                                        <a href="javascript: void(0);" className="add"></a>
                                        <a href="javascript: void(0);" className="collect"></a>
                                        <a href="javascript: void(0);" className="share"></a>
                                        <a href="javascript: void(0);" className="download"></a>
                                    </div>
                                </td>
                                <td><a href="#">张艺兴</a></td>
                            </tr>
                            <tr>
                                <td>
                                    <span className="no">1</span>
                                    <i className="icon-six status"></i>
                                </td>
                                <td>
                                    <div className="name">
                                        <i className="play play-active"></i>
                                        <a href="#" className="name">When It's Christmas</a>
                                    </div>
                                </td>
                                <td className="time">
                                    <span>03:36</span>
                                    <div className="oper">
                                        <a href="javascript: void(0);" className="add"></a>
                                        <a href="javascript: void(0);" className="collect"></a>
                                        <a href="javascript: void(0);" className="share"></a>
                                        <a href="javascript: void(0);" className="download"></a>
                                    </div>
                                </td>
                                <td><a href="#">张艺兴</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
