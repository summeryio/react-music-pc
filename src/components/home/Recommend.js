import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Recommend extends Component {
    constructor(props) {
        super(props)

        this.state = {
            show: false
        }
    }
    
    componentDidMount() {
        this.props.getRecommend()
    }
    
    render() {
        let {recommendData} = this.props
        let week = ['Sunday', 'Monday', 'Tuesday', 'Wendsday', 'Thursday', 'Friday', 'Saturday']
        let nowDate = new Date()
        
        return (
            <section className="recomment">
                <div className="header">
                    <h3 className="icon-five">个性化推荐</h3>
                </div>
                <ul className="play-list clearfix">
                    <li>
                        <div className="pic icon-date">
                            <p className="week">{week[nowDate.getDay()]}</p>
                            <p className="day">{nowDate.getDate()}</p>
                            <a href="#" className="date-mask icon-date"></a>
                        </div>
                        <p className="name">
                            <a href="#" title="每日歌曲推荐" className="t-udl">每日歌曲推荐</a>
                            <span className="date-tip">根据你的口味生成，<br/>每天6:00更新</span>
                        </p>
                    </li>
                    {
                        recommendData.length > 0 ? recommendData.map(data => {
                            let playCount = data.playcount > 100000 ? parseInt(data.playcount / 10000) + '万' : parseInt(data.playcount)
                            
                            return (
                                <li key={data.id}>
                                    <div className="pic">
                                        <img src={data.picUrl + '?param=140y140'} alt={data.name}/>
                                        <Link to={`playDetail/${data.id}`} title={data.name} className="mask icon-coverall"></Link>
                                        <p className="info icon-coverall">
                                            <span className="icon-seven"></span>
                                            <span className="num">{playCount}</span>
                                            <a href="javascript:void(0);" className="icon-seven play"></a>
                                        </p>
                                    </div>
                                    <p className="name">
                                        <Link to={`playDetail/${data.id}`} title={data.name} className="t-udl">{data.name}</Link>
                                    </p>
                                    <p className='copywriter'>
                                        <a href="javascript:void(0);" className="icon-five">不感兴趣</a>
                                        <span>{data.copywriter}</span>
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
