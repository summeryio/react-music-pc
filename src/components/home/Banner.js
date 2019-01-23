import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import RGBaster from 'common/js/rgbaster.js'


export default class Banner extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sliderIndex: 0,
            nowImageUrl: '',
            sliderNum: 0,
            themeColor: ''
        }

        this.init = this.init.bind(this)
    }

    next = () => {
        let {sliderNum} = this.state
        let count = this.state.sliderIndex

        count ++
        if (count === sliderNum) count = 0
        this.init(count)
    }

    prev = () => {
        let {sliderNum} = this.state
        let count = this.state.sliderIndex

        count --
        if (count < 0) count = sliderNum - 1
        this.init(count)
    }

    initThemeColor = (url) => {
        let _this = this

        RGBaster.colors(url, {
            success: function(payload) {
                _this.setState({
                    themeColor: payload.dominant
                })
            }
        })
    }

    init = (count) => {
        let {datas} = this.props

        this.setState({
            sliderIndex: count,
            nowImageUrl: datas[count].imageUrl,
            sliderNum: datas.length
        })

        this.initThemeColor(datas[count].imageUrl)
    }
    
    componentWillReceiveProps(nextProps) {
        let {datas} = this.props
        let {sliderIndex} = this.state

        if (datas.length > 0) {
            this.init(sliderIndex)
        }
    }

    componentWillUnmount() {
        this.setState = (state, callback)=>{
            return
        }
    }
    
    render() {
        let {datas} = this.props
        let {themeColor, sliderIndex, nowImageUrl} = this.state
        let nowSlider = datas[sliderIndex]
        let targetType = {
            1: 'songDetail',
            10: 'albumDetail',
            1000: 'playDetail'
        }

        let temp = null
        if (datas.length) {
            if (nowSlider.url && nowSlider.targetType === 3000) {
                temp = (<a href={nowSlider.url} target="_blank" className="pic">
                {nowImageUrl ? <img src={nowImageUrl} /> : null}</a>)
            } else {
                temp = (<Link to={`/${targetType[nowSlider.targetType]}/${nowSlider.targetId}`} className="pic">
                {nowImageUrl ? <img src={nowImageUrl} /> : null}</Link>)
            }
        }

        let targetLink = ''
        if (datas.length) {
            if (nowSlider.url && nowSlider.targetType === 3000) {
                targetLink = nowSlider.url
            } else {
                targetLink = `/${targetType[nowSlider.targetType]}/${nowSlider.targetId}`
            }
        }

        

        // 1 单曲  10专辑 1000 歌单

        return (
            <div id="home_banner" ref="homeBanner" style={{backgroundColor: themeColor}}>
                {
                    datas.length
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
                                datas.length > 0 && datas.map((data, i) => {
                                    let cls = i === sliderIndex ? 'active' : ''

                                    return (
                                        <li key={i} className={cls} onClick={ev => this.init(i)}></li>
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
