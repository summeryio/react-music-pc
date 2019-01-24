import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './MusicDetailRedux'

import {formatDateYMD, formatDateHM, formatStringLine} from 'common/js/util'

import PublicModule from 'common/component/PublicModule'
import Comment from 'common/component/Comment'
import Loading from 'common/component/Loading'

class MVDetail extends Component {
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
                <main id="main" className="g-bd">
                    <div className="main-inner">
                        <h3 className="mv-title">
                            <i className="icon-eight"></i>
                            {datas.name}
                            <a href="#" className="t-udl">{datas.artistName}</a>
                        </h3>
                        {
                            mvUrl
                            ? (<video controls={true} name="media" className="mv-video"><source src={mvUrl} type="video/mp4" /></video>) : null
                        }
                        <p className="time">发布时间：{datas.publishTime}</p>
                        <p className="count">播放次数：{datas.playCount > 10000 ? parseInt(datas.playCount / 10000) : datas.playCount}万次</p>
                        <p className="desc">{datas.desc}</p>
                        {loaded ? <Comment id={id} urlType="mv"/> : null}
                    </div>
                </main>
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