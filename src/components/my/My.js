import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
// import * as actions from './HomeRedux'
import PublicModule from 'common/component/PublicModule'

class My extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <PublicModule 
                {...{
                    pageId: 'my_page',
                    navActive: '/my'
                }}
            >
            </PublicModule>
        )
    }
}

export default My