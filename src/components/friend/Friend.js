import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
// import * as actions from './HomeRedux'
import PublicModule from 'common/component/PublicModule'

class Friend extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <PublicModule 
                {...{
                    pageId: 'friend_page',
                    navActive: '/friend'
                }}
            >
            </PublicModule>
        )
    }
}

export default Friend