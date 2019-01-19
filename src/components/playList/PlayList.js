import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './PlayListRedux'
import { Pagination } from 'antd'

import PublicModule from 'common/component/PublicModule'

class PlayList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showPopup: false
        }
    }
    
    componentDidMount() {
        let {getPlayList, getCatList} = this.props.playListAction

        getPlayList()
        getCatList()

        document.addEventListener('click', () => {
            this.setState({showPopup: false})
        })
    }

    componentWillUnmount() {
        this.state = (state, callback) => {
            return {}
        }
    }
    
    render () {
        let {playListData, catListData} = this.props.playList
        let {showPopup} = this.state

        let playListTemp = Object.keys(playListData).length > 0 ? playListData.playlists.map(data => {
            let playCount = data.playCount > 100000 ? parseInt(data.playCount / 10000) + '万' : parseInt(data.playCount)
            
            return (
                <li key={data.id}>
                    <div className="pic">
                        <img src={data.coverImgUrl} alt={data.name} />
                        <a href="#" title={data.name} className="mask icon-coverall"></a>
                        <p className="info icon-coverall">
                            <span className="icon-seven"></span>
                            <span className="num">{playCount}</span>
                            <a href="javascript:;" className="icon-seven play"></a>
                        </p>
                    </div>
                    <p className="desc">
                        <a href="#" title={data.name} className="t-udl t-hide">{data.name}</a>
                    </p>
                    <p className="author">
                        by
                        <a href="#" className="t-udl t-hide">{data.creator.nickname}</a>
                    </p>
                </li>
            )
        }) : null
        let catListTemp = Object.keys(catListData).length > 0 ? Object.keys(catListData.categories).map(key => {
            let val = catListData.categories[key]
            key = parseInt(key)
            let subTemp = catListData.sub.map((item, i) => {
                if (item.category === key) {
                    return (
                        <p key={i}><a href="#" className="t-udl">{item.name}</a><i>|</i></p>
                    )
                }
            })
            
            return (
                <dl key={key}>
                    <dt><i className={`icon-six icon-t${key}`}></i>{val}</dt>
                    <dd>{subTemp}</dd>
                </dl>
            )
        }) : null

        return (
            <PublicModule 
                {...{
                    pageId: 'playList_page',
                    navActive: '/',
                    barActive: '/discover/playList'
                }}
            >
                <main id="main" className="g-bd">
                    <div className="inner">
                        <div className="category clearfix">
                            <div className="fl">
                                <h3>全部</h3>
                                <a 
                                    href="javascript: void(0);"
                                    className="u-btn2"
                                    onClick={ev => {
                                        ev.nativeEvent.stopImmediatePropagation()
                                        this.setState({showPopup: !showPopup})
                                    }}
                                >
                                    <i>选择分类<em className="icon-three"></em></i>
                                </a>
                            </div>
                            <div className="fr icon-button2 order_hot">
                                <a href="javascript: void(0);" className="t-udl a1">热门</a>
                                <a href="javascript: void(0);" className="t-udl a2">最新</a>
                            </div>
                            <div className={`category-popup ${showPopup ? 'show' : ''}`}>
                                <div className="t"><i className="icon-seven"></i></div>
                                <div className="c">
                                    <div className="all"><a href="javascript: void(0);" className="t-udl icon-button2">全部风格</a></div>
                                    {catListTemp}
                                    <div className="space"></div>
                                </div>
                                <div className="b"></div>
                            </div>
                        </div>
                        <div className="content">
                            <ul className="play-list clearfix">{playListTemp}</ul>
                        </div>
                        <div id="paging">
                            <Pagination 
                                defaultCurrent={1} 
                                total={playListData.total}
                                pageSize={35}
                                onChange={(page, pageSize) => {
                                    // commentPaging(id, page, urlType)
                                }}
                            />
                        </div>
                    </div>
                </main>
            </PublicModule>
        )
    }
}

export default connect(
    state => {
        let {
            playList
        } = state

        return {
            playList
        }
    },
    dispatch => {
        return {
            playListAction: bindActionCreators({...actions}, dispatch)
        }
    }
)(PlayList)