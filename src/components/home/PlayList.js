import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class PlayList extends Component {
    render() {
        let {playListTag,playListData} = this.props

        return (
            <section className="play">
                <div className="header">
                    <h3 className="icon-five">热门推荐</h3>
                    <ul className="cat">
                        {
                            playListTag.length > 0 ? playListTag.map((tag, i) => {
                                return (
                                    <li key={tag.id}>
                                        <Link to={`/discover/playList/${tag.name}`} className="t-udl">{tag.name}</Link>
                                        {i !== playListTag.length - 1 ? <span>|</span> : null}
                                    </li>
                                )
                            }) : null
                        }
                    </ul>
                    <div className="more icon-five"><Link to="/discover/playList/全部" className="t-udl">更多</Link></div>
                </div>
                <ul className="play-list clearfix">
                    {
                        playListData.length > 0 ? playListData.map(data => {
                            let playCount = data.playCount > 100000 ? parseInt(data.playCount / 10000) + '万' : parseInt(data.playCount)
                            
                            return (
                                <li key={data.id}>
                                    <div className="pic">
                                        <img src={data.picUrl + '?param=140y140'} alt={data.name}/>
                                        <Link to={`/playDetail/${data.id}`} title={data.name} className="mask icon-coverall"></Link>
                                        <p className="info icon-coverall">
                                            <span className="icon-seven"></span>
                                            <span className="num">{playCount}</span>
                                            <a href="javascript:;" className="icon-seven play"></a>
                                        </p>
                                    </div>
                                    <p className="desc">
                                        <Link to={`/playDetail/${data.id}`} className="t-udl">{/* <i className="icon-six"></i> */}{data.name}</Link>
                                    </p>
                                </li>
                            )
                        }) : null
                    }
                    
                </ul>
            </section>
        )
    }
}
