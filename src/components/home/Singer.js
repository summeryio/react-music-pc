import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Singer extends Component {
    render() {
        let {singerData} = this.props
        let singerTemp = singerData.length > 0 ? singerData.map(singer => {
            return (
                <li key={singer.accountId}>
                    <Link to={`/user/${singer.accountId}`}>
                        <img src={singer.img1v1Url}/>
                        <h3>{singer.name}</h3>
                        <p>网易音乐人</p>
                    </Link>
                </li>
            )
        }) : null
        
        return (
            <div className="singer">
                <div className="bar-title">
                    <h4>入驻歌手</h4>
                    <a href="#" className="fr t-udl">查看全部></a>
                </div>
                <ul className="list">{singerTemp}</ul>
                <div><a href="#" className="btn u-btn2"><i>申请成为网易音乐人</i></a></div>
            </div>
        )
    }
}
