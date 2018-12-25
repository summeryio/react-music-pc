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

    componentDidMount() {
        let {getTopListTag} = this.props.topListAction

        getTopListTag()
    }

    render() {
        let {tagList} = this.props.topList
        console.log(tagList);
        
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
                        <SiderBarList tagList={tagList}/>
                    </div>
                    <div className="main-content">
                        <div className="inner">
                            <SongSummary />
                            <SongList />
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