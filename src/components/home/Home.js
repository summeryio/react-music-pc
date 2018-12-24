import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './HomeRedux'
import PropTypes from 'prop-types'

import PublicModule from 'common/component/PublicModule'
import Banner from './Banner'
import PlayList from './PlayList'
import Recommend from './Recommend'
import AlBum from './Album'
import Rank from './Rank'
import User from './User'
import Singer from './Singer'

class Home extends Component {
    constructor(props) {
        super(props)
    }
    
    componentDidMount() {
        let {
            getBanner,
            getPlayListTag,
            getPlayList,
            getAlbum,
            getRank,
            getSinger
        } = this.props.homeAction
        
        getBanner()
        getPlayListTag()
        getPlayList()
        getAlbum()
        getRank()
        getSinger()
    }
    
    render() {
        let {
            bannerData,
            playListTag,
            playListData,
            recommendData,
            albumData,
            rankData,
            userInfo,
            singerData
        } = this.props.home
        let {
            getRecommend,
            getUserInfo
        } = this.props.homeAction
        let {code} = this.context.user
        let {userId} = code === 200 ? this.context.user.data.profile : 0

        return (
            <PublicModule 
                {...{
                    pageId: 'home_page',
                    navActive: '/',
                    barActive: '/discover'
                }}
            >
                <Banner datas={bannerData} />
                <main id="main" className="g-bd home-bd">
                    <div className="main-content">
                        <div className="inner">
                            <PlayList {...{playListTag, playListData}} />
                            {code === 200 ? (<Recommend {...{getRecommend, recommendData}} />) : null}
                            <AlBum albumData={albumData} />
                            <Rank rankData={rankData}/>
                        </div>
                    </div>
                    <div className="main-siderBar">
                        <User {...{getUserInfo, code, userId, userInfo}}/>
                        <Singer singerData={singerData}/>
                    </div>
                </main>
            </PublicModule>
        )
    }
}

Home.contextTypes = {
    user: PropTypes.object
}

export default connect(
    state => {
        let {
            home
        } = state

        return {
            home
        }
    },
    dispatch => {
        return {
            homeAction: bindActionCreators({...actions}, dispatch)
        }
    }
)(Home)