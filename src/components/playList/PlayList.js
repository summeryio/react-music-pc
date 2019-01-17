import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import PublicModule from 'common/component/PublicModule'

export default class PlayList extends Component {
    render () {
        return (
            <PublicModule 
                {...{
                    pageId: 'playList_page',
                    navActive: '/',
                    barActive: '/discover/playList'
                }}
            >
                <main id="main" className="g-bd">
                    <div className="category"></div>
                    <div className="content"></div>
                </main>
            </PublicModule>
        )
    }
}
