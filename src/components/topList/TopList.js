import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './TopListRedux'

import PublicModule from 'common/component/PublicModule'
import SiderBarList from './SiderBarList'
import SongSummary from './SongSummary'
import SongList from './SongList'
import Comment from 'common/component/Comment'

class TopList extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        let {getTopListTag} = this.props.topListAction
        let {id} = this.props.match.params

        getTopListTag(id)
    }

    render() {
        let {changeTag} = this.props.topListAction
        let {tagList, playList, playListLoaded, updateFrequency} = this.props.topList
        let {id} = this.props.match.params

        return (
            <PublicModule 
                {...{
                    pageId: 'topList_page',
                    navActive: '/',
                    barActive: '/discover/topList'
                }}
            >
                <main id="main" className="g-bd topList-bd clearfix">
                    <div className="main-siderBar">
                        <SiderBarList {...{changeTag, tagList, id, playList}}/>
                    </div>
                    <div className="main-content">
                        <div className="inner">
                            <SongSummary {...{playList, updateFrequency}}/>
                            <SongList {...{playList, playListLoaded}}/>
                            {playListLoaded ? <Comment id={id} urlType="playlist"/> : null}
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
            topList
        } = state

        return {
            topList
        }
    },
    dispatch => {
        return {
            topListAction: bindActionCreators({...actions}, dispatch)
        }
    }
)(TopList)