import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './TopListRedux'

import PublicModule from 'common/component/PublicModule'
import SiderBarList from './SiderBarList'
import SongSummary from './SongSummary'
import SongList from './SongList'

class TopList extends Component {
    constructor(props) {
        super(props)
    }

    /* componentWillReceiveProps(nextProps) {
        let {tagList} = nextProps.topList
        if (tagList.length) {
            this.setState({
                id: tagList[0].id
            })
        }
    } */

    componentDidMount() {
        let {getTopListTag} = this.props.topListAction

        getTopListTag()
    }

    render() {
        let {changeTag} = this.props.topListAction
        let {tagList, tagID, dataList, updateFrequency} = this.props.topList

        return (
            <PublicModule 
                {...{
                    pageId: 'topList_page',
                    navActive: '/',
                    barActive: '/discover/topList'
                }}
            >
                <main id="main" className="g-bd topList-bd">
                    <div className="main-siderBar">
                        <SiderBarList {...{changeTag, tagList, tagID, dataList}}/>
                    </div>
                    <div className="main-content">
                        <div className="inner">
                            <SongSummary {...{dataList, updateFrequency}}/>
                            <SongList {...{dataList}}/>
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