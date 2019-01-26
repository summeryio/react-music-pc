import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './MusicDetailRedux'

import PublicModule from 'common/component/PublicModule'
import Comment from 'common/component/Comment'

import { Player } from 'video-react';
import "video-react/dist/video-react.css";

class MVDetail extends Component {
    componentWillReceiveProps(nextProps) {
        let {id} = this.props.match.params
        let nextId = nextProps.match.params.id
        let {getMVDetail, getMVUrl} = this.props.musicDetailAction

        if (id !== nextId) {
            getMVDetail(nextId)
            getMVUrl(nextId)
        }
    }
    
    componentDidMount() {
        let {getMVDetail, getMVUrl} = this.props.musicDetailAction
        let {id} = this.props.match.params

        getMVDetail(id)
        getMVUrl(id)
    }
    
    render () {
        let {id} = this.props.match.params
        let {mvDetailData, mvUrl} = this.props.musicDetail
        let loaded = mvDetailData.code === 200
        let datas = loaded ? mvDetailData.data : {}

        return (
            <PublicModule 
                {...{
                    pageId: 'mvDetail_page',
                    navActive: '/'
                }}
            >
                <div id="main" className="g-bd">
                    <div className="main-inner">
                        <h3 className="mv-title">
                            <i className="icon-eight"></i>
                            {datas.name}
                            <a href="#" className="t-udl">{datas.artistName}</a>
                        </h3>
                        <Player
                            playsInline
                            fluid={false}
                            width="100%"
                            height={460}
                            autoPlay={true}
                            poster={datas.cover}
                            src={mvUrl}
                        />
                        <p className="time">发布时间：{datas.publishTime}</p>
                        <p className="count">播放次数：{datas.playCount > 10000 ? parseInt(datas.playCount / 10000) : datas.playCount}万次</p>
                        <p className="desc">{datas.desc}</p>
                        {loaded ? <Comment id={id} urlType="mv"/> : null}
                    </div>
                </div>
            </PublicModule>
        )
    }
}

export default connect(
    state => {
        let {
            musicDetail
        } = state

        return {
            musicDetail
        }
    },
    dispatch => {
        return {
            musicDetailAction: bindActionCreators({...actions}, dispatch)
        }
    }
)(MVDetail)