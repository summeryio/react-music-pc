import React, { Component } from 'react'

export default class SiderBarList extends Component {
    render() {
        return (
            <div>
                <h4>云音乐特色榜</h4>
                <ul>
                    <li className="active">
                        <div className="pic"><img src="http://p1.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg?param=40y40" alt=""/></div>
                        <div className="info">
                            <p className="name">云音乐特色榜</p>
                            <p className="tip">每天更新</p>
                        </div>
                    </li>
                    <li>
                        <div className="pic"><img src="http://p1.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg?param=40y40" alt=""/></div>
                        <div className="info">
                            <p className="name">云音乐特色榜</p>
                            <p className="tip">每天更新</p>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}
