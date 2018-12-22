import React, { Component } from 'react'
import {splitArray} from 'common/js/util'

import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'


export default class AlBum extends Component {
    constructor(props) {
        super(props)

        this.swiper = null
    }
    
    componentDidUpdate() {
        this.swiper.update()
    }

    componentDidMount() {
        this.swiper = new Swiper('.swiper-container', {
            navigation: {
                nextEl: '.next',
                prevEl: '.prev',
            },
            loop: true,
            resistanceRatio: 0
        });
    }
    
    render() {
        let albumData = splitArray(this.props.albumData, 5)
        let albumTemp = albumData.length > 0 ? albumData.map((item, i) => {
            return (
                <ul className="fl swiper-slide" key={i}>
                    {
                        item.map(data => {
                            let singer = data.artists.map((singer, j) => {
                                let dot = (data.artists.length === 1 || j === data.artists.length - 1) ? '' : ' / '
                                
                                return (
                                    <span key={singer.id}><a href="#" className="t-udl">{singer.name}</a>{dot}</span>
                                )
                            })
                            
                            return (
                                <li key={data.id}>
                                    <div className="pic">
                                        <img src={data.picUrl} alt={data.name}/>
                                        <a href="#" title={data.name} className="icon-coverall mask"></a>
                                        <a href="#" className="icon-seven play"></a>
                                    </div>
                                    <div className="info">
                                        <p className="name"><a href="#" className="t-udl">{data.name}</a></p>
                                        <p className="singer t-hide">{singer}</p>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            )
        }) : null

        return (
            <section className="album">
                <div className="header">
                    <h3 className="icon-five">新碟上架</h3>
                    <div className="more icon-five"><a href="#" className="t-udl">更多</a></div>
                </div>
                <div className="album-list" ref="albumList">
                    <div className="inner">
                        <div className="wrap swiper-container">
                            <div className="sliderWrap swiper-wrapper">{albumTemp}</div>
                        </div>
                        <div className="btn">
                            <a href="javascript: void(0);" className="icon-five prev"></a>
                            <a href="javascript: void(0);" className="icon-five next"></a>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
