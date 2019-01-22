import React, { Component } from 'react'
import {Link} from 'react-router-dom'


export default class Rank extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        let {rankData} = this.props
        let rankTemp = rankData.length === 3 ? rankData.map(item => {
            return (
                <dl className="item" key={item.id}>
                    <dt className="top">
                        <div className="pic">
                            <img src={item.coverImgUrl + '?param=100y100'} alt={item.name}/>
                            <a href="#" className="icon-coverall mask"></a>
                        </div>
                        <div className="info">
                            <h3><Link to={`/discover/topList/${item.id}`} className="t-udl">{item.name}</Link></h3>
                            <p>
                                <a href="javascript: void(0);" className="icon-five icon-play"></a>
                                <a href="javascript: void(0);" className="icon-five icon-collect"></a>
                            </p>
                        </div>
                    </dt>
                    <dd>
                        <ol className="list">
                            {
                                item.tracks.map((song, i) => {
                                    let numTop = i < 4 ? 'num-top' : ''
                                    
                                    return (
                                        <li key={song.id}>
                                            <span className={`num ${numTop}`}>{i + 1}</span>
                                            <Link to={`songDetail/${song.id}`} className="t-udl t-hide name">{song.name}</Link>
                                            <div className="operation">
                                                <a href="javascript: void(0);" className="icon-five icon-play"></a>
                                                <a href="javascript: void(0);" className="icon-six icon-add"></a>
                                                <a href="javascript: void(0);" className="icon-five icon-collect"></a>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                            
                        </ol>
                        <div className="more"><Link to={`/discover/topList/${item.id}`} className="t-udl">查看全部></Link></div>
                    </dd>
                </dl>
            )
        }) : null

        return (
            <section className="rank">
                <div className="header">
                    <h3 className="icon-five">榜单</h3>
                    <div className="more icon-five"><Link to={`/discover/topList/${19723756}`} className="t-udl">更多</Link></div>
                </div>
                <div className="rank-list clearfix">
                    <div className="inner">{rankTemp}</div>
                </div>
            </section>
        )
    }
}
