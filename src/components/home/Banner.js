import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Banner extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sliderIndex: 0
        }
    }

    next = () => {
        let {datas} = this.props
        let count = this.state.sliderIndex

        count ++
        if (count === datas.length) count = 0
        this.setState({
            sliderIndex: count
        })
    }

    prev = () => {
        let {datas} = this.props
        let count = this.state.sliderIndex

        count --
        if (count < 0) count = datas.length - 1
        this.setState({
            sliderIndex: count
        })
    }

    componentWillUnmount() {
        this.setState = (state, callback)=>{
            return
        }
    }
    
    render() {
        let {datas} = this.props
        let {sliderIndex} = this.state
        let nowSlider = datas[sliderIndex]
        let targetType = { // 1单曲  10专辑 1000歌单 1004采访
            1: 'songDetail',
            10: 'albumDetail',
            1000: 'playDetail',
            1004: 'mvDetail'
        }
        let loaded = datas.length > 0 ? true : false

        let temp = null
        if (loaded) {
            let type = parseInt(nowSlider.targetType)
            
            /* if (nowSlider.url && type === 3000) {
                temp = (<a href={nowSlider.url} target="_blank" className="pic"><img src={nowSlider.picUrl} /></a>)
            } else {
                temp = (<Link to={`/${targetType[type]}/${nowSlider.targetId}`} className="pic"><img src={nowSlider.picUrl} /></Link>)
            } */
            temp = (<Link to={`/${targetType[type]}/${nowSlider.targetId}`} className="pic"><img src={nowSlider.picUrl} /></Link>)
        }

        return (
            <div id="home_banner" ref="homeBanner" style={{backgroundImage: loaded && `url(${nowSlider.backgroundUrl})`}}>
                {
                    loaded
                    ? (<div className="inner">
                        <div className="wrap">
                            {temp}
                            <a 
                                href="javascript: void(0);"
                                className="icon-banner btn btn-prev"
                                onClick={ev => this.prev()}
                            ></a>
                            <a 
                                href="javascript: void(0);"
                                className="icon-banner btn btn-next"
                                onClick={ev => this.next()}
                            ></a>
                        </div>
                        <ul className="nav">
                            {
                                datas.map((data, i) => {
                                    let cls = i === sliderIndex ? 'active' : ''

                                    return (
                                        <li key={i} className={cls} onClick={ev => this.setState({sliderIndex: i})}></li>
                                    )
                                })
                            }
                        </ul>
                    </div>) : null
                }
            </div>
        )
    }
}
