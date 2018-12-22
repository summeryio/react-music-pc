import React, { Component } from 'react'

import RGBaster from 'common/js/rgbaster.js'


export default class Banner extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sliderIndex: 1,
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
    
    componentWillReceiveProps() {
        let {datas} = this.props
        let {sliderIndex} = this.state

        if (datas.length > 0) {
            this.init(sliderIndex)
        }
    }
    
    render() {
        let {datas} = this.props
        let {themeColor, sliderIndex, nowImageUrl, sliderNum} = this.state

        return (
            datas.length > 0
            ? (
                <div id="home_banner" ref="homeBanner" style={{backgroundColor: themeColor}}>
                    <div className="inner">
                        <div className="wrap">
                            <a href="#" className="pic">
                                <img src={nowImageUrl} />
                            </a>
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
                                        <li key={i} className={cls} onClick={ev => this.init(i)}></li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            ) : null
        )
    }
}
