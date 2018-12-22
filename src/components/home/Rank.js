import React, { Component } from 'react'
import {splitArray} from 'common/js/util'


export default class Rank extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        // /toplist/detail  -> list   获取榜单信息
        // /playlist/detail?id=19723756  获取榜单内歌曲，传入榜单id

        let {rankData} = this.props
        let rankTemp = rankData.length === 3 ? rankData.map(item => {
            return (
                <dl className="item" key={item.id}>
                    <dt className="top">
                        <div className="pic">
                            <img src={item.coverImgUrl} alt={item.name}/>
                            <a href="#" className="icon-coverall mask"></a>
                        </div>
                        <div className="info">
                            <h3><a href="#" className="t-udl">{item.name}</a></h3>
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
                                            <a href="#" className="t-udl t-hide name">{song.name}</a>
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
                        <div className="more"><a href="#" className="t-udl">查看全部></a></div>
                    </dd>
                </dl>
            )
        }) : null

        return (
            <section className="rank">
                <div className="header">
                    <h3 className="icon-five">榜单</h3>
                    <div className="more icon-five"><a href="#" className="t-udl">更多</a></div>
                </div>
                <div className="rank-list clearfix">
                    <div className="inner">{rankTemp}</div>
                </div>
            </section>
        )
    }
}
