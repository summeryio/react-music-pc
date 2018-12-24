import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
// import * as actions from './HomeRedux'

import PublicModule from 'common/component/PublicModule'
import SiderBarList from './SiderBarList'

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
                <main id="main" className="g-bd g-bd__l topList-bd">
                    <div className="main-content"></div>
                    <div className="main-siderBar">
                        <SiderBarList />
                    </div>
                </main>
            </PublicModule>
        )
    }
}

export default TopList