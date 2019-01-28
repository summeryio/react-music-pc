import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './PlayListRedux'
import { Pagination } from 'antd'

import PublicModule from 'common/component/PublicModule'
import Loading from 'common/component/Loading'

class PlayList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showPopup: false,
            order: 'hot',
            page: 1
        }
    }

    componentWillReceiveProps(nextProps) {
        let {getPlayList} = this.props.playListAction
        let {cat} = this.props.match.params
        let nextCat = nextProps.match.params.cat
        let {order} = this.state

        if (cat !== nextCat) {
            getPlayList(order, nextCat, 1)
            this.setState({page: 1})
        }
    }

    componentWillUpdate (nextProps, nextState) {
        let {getPlayList} = this.props.playListAction
        let {order, page} = this.state
        let {cat} = this.props.match.params
        
        if (order !== nextState.order || page !== nextState.page) {
            window.scrollTo(0, 0)
            getPlayList(nextState.order, cat, nextState.page)
        }
    }
    
    componentDidMount() {
        let {getPlayList, getCatList} = this.props.playListAction
        let {order, page} = this.state
        let {cat} = this.props.match.params

        getPlayList(order, cat, page)
        getCatList()

        document.addEventListener('click', () => {
            this.setState({showPopup: false})
        })
    }

    componentWillUnmount() {
        this.setState = (state, callback)=>{
            return
        }
    }
    
    render () {
        let {playListData, catListData} = this.props.playList
        let {showPopup, order, page} = this.state
        let {cat} = this.props.match.params

        let playListTemp = Object.keys(playListData).length > 0 ? playListData.playlists.map(data => {
            let playCount = data.playCount > 100000 ? parseInt(data.playCount / 10000) + '万' : parseInt(data.playCount)
            
            return (
                <li key={data.id}>
                    <div className="pic">
                        <img src={data.coverImgUrl + '?param=140y140'} alt={data.name} />
                        <Link to={`/playDetail/${data.id}`} title={data.name} className="mask icon-coverall"></Link>
                        <p className="info icon-coverall">
                            <span className="icon-seven"></span>
                            <span className="num">{playCount}</span>
                            <a href="javascript:;" className="icon-seven play"></a>
                        </p>
                    </div>
                    <p className="desc">
                        <Link to={`/playDetail/${data.id}`} title={data.name} className="t-udl t-hide">{data.name}</Link>
                    </p>
                    <p className="author">
                        by
                        <Link to={`/user/${data.creator.userId}`} className="t-udl t-hide">{data.creator.nickname}</Link>
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
                        <p key={i}>
                            <Link 
                                to={`/discover/playList/${item.name}`} 
                                className={`t-udl ${cat === item.name ? 'cur' : ''}`}
                            >{item.name}</Link>
                            <i>|</i>
                        </p>
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
                <div id="main" className="g-bd">
                    <div className="inner">
                        <div className="category clearfix">
                            <div className="fl">
                                <h3>{cat}</h3>
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
                            <div className={`fr icon-button2 ${order}`}>
                                <a 
                                    href="javascript: void(0);" 
                                    className="t-udl a1"
                                    onClick={ev => this.setState({order: 'hot', page: 1})}
                                >热门</a>
                                <a 
                                    href="javascript: void(0);" 
                                    className="t-udl a2"
                                    onClick={ev => this.setState({order: 'new', page: 1})}
                                >最新</a>
                            </div>
                            <div className={`category-popup ${showPopup ? 'show' : ''}`}>
                                <div className="t"><i className="icon-seven"></i></div>
                                <div className="c">
                                    <div className="all">
                                        <Link 
                                            to="/discover/playList/全部"
                                            className="t-udl icon-button2"
                                        >全部风格</Link>
                                    </div>
                                    {catListTemp}
                                    <div className="space"></div>
                                </div>
                                <div className="b"></div>
                            </div>
                        </div>
                        <div className="content">
                            <ul className="play-list clearfix">{playListTemp ? playListTemp : <Loading />}</ul>
                        </div>
                        {
                            playListData.total > 35
                            ? (
                                <div id="paging">
                                    <Pagination 
                                        defaultCurrent={1} 
                                        total={playListData.total}
                                        current={page}
                                        pageSize={35}
                                        size="small"
                                        onChange={(page, pageSize) => {
                                            this.setState({page})
                                        }}
                                    />
                                </div>
                            ) : null
                        }
                    </div>
                </div>
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