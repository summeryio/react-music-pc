import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
// import * as actions from './HomeRedux'
import PublicModule from 'common/component/PublicModule'

class TopList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <PublicModule 
                {...{
                    pageId: 'topList_page',
                    navActive: '/',
                    barActive: '/discover/topList'
                }}
            >
                <main id="main" className="g-bd topList-bd"></main>
            </PublicModule>
        )
    }
}

export default TopList