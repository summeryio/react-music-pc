import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {splitArray} from 'common/js/util'

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
                                    <span key={singer.id}><Link to={`/artist/${singer.id}`} className="t-udl">{singer.name}</Link>{dot}</span>
                                )
                            })
                            
                            return (
                                <li key={data.id}>
                                    <div className="pic">
                                        <img src={data.picUrl + '?param=100y100'} alt={data.name}/>
                                        <Link to={`/albumDetail/${data.id}`} title={data.name} className="icon-coverall mask"></Link>
                                        <a href="#" className="icon-seven play"></a>
                                    </div>
                                    <div className="info">
                                        <p className="t-hide name"><Link to={`/albumDetail/${data.id}`} className="t-udl">{data.name}</Link></p>
                                        <p className="t-hide singer">{singer}</p>
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
                    <div className="more icon-five"><Link to="/discover/album" className="t-udl">更多</Link></div>
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
