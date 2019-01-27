/* import React, { Component } from 'react'
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
            cat: props.match.params.cat || '全部'
        }
    }

    componentWillUpdate (nextProps, nextState) {
        let {getPlayList} = this.props.playListAction
        let {order, cat} = this.state
        
        if (order !== nextState.order || cat !== nextState.cat) {
            getPlayList(nextState.order, nextState.cat, 35)
        }
    }
    
    componentDidMount() {
        let {getPlayList, getCatList} = this.props.playListAction
        let {order, cat} = this.state

        getPlayList(order, cat, 35)
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
        let {getPlayList} = this.props.playListAction
        let {playListData, catListData} = this.props.playList
        let {showPopup, order, cat} = this.state
        console.log(cat);

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
                                onClick={ev => {
                                    this.setState({
                                        cat: item.name
                                    })
                                }}
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
                                    onClick={ev => this.setState({order: 'hot'})}
                                >热门</a>
                                <a 
                                    href="javascript: void(0);" 
                                    className="t-udl a2"
                                    onClick={ev => this.setState({order: 'new'})}
                                >最新</a>
                            </div>
                            <div className={`category-popup ${showPopup ? 'show' : ''}`}>
                                <div className="t"><i className="icon-seven"></i></div>
                                <div className="c">
                                    <div className="all">
                                        <Link 
                                            to="/discover/playList"
                                            className="t-udl icon-button2"
                                            onClick={ev => {
                                                this.setState({
                                                    cat: '全部'
                                                })
                                            }}
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
                            playListData.more
                            ? (
                                <div id="paging">
                                    <Pagination 
                                        defaultCurrent={1} 
                                        total={playListData.total}
                                        pageSize={35}
                                        onChange={(page, pageSize) => {
                                            getPlayList(order, cat, page)
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
)(PlayList) */


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
            order: 'hot'
        }
    }

    componentWillReceiveProps(nextProps) {
        let {getPlayList} = this.props.playListAction
        let {cat} = this.props.match.params
        let nextCat = nextProps.match.params.cat
        let {order} = this.state

        if (cat !== nextCat) {
            getPlayList(order, nextCat, 35)
        }
    }

    componentWillUpdate (nextProps, nextState) {
        let {getPlayList} = this.props.playListAction
        let {order} = this.state
        let {cat} = this.props.match.params
        
        if (order !== nextState.order) {
            getPlayList(nextState.order, cat, 35)
        }
    }
    
    componentDidMount() {
        let {getPlayList, getCatList} = this.props.playListAction
        let {order} = this.state
        let {cat} = this.props.match.params

        getPlayList(order, cat, 35)
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
        let {getPlayList} = this.props.playListAction
        let {playListData, catListData} = this.props.playList
        let {showPopup, order} = this.state
        let {cat} = this.props.match.params
        console.log(playListData);

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
                                    onClick={ev => this.setState({order: 'hot'})}
                                >热门</a>
                                <a 
                                    href="javascript: void(0);" 
                                    className="t-udl a2"
                                    onClick={ev => this.setState({order: 'new'})}
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
                            playListData.more
                            ? (
                                <div id="paging">
                                    <Pagination 
                                        defaultCurrent={1} 
                                        total={playListData.total}
                                        pageSize={35}
                                        onChange={(page, pageSize) => {
                                            getPlayList(order, cat, page)
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