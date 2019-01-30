import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './PublicRedux'

import Header from './Header'
import Footer from './Footer'
import BackTop from './BackTop'
import Login from './Login'

class PublicModule extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.publicState.isShowLogin) {
            document.body.style.overflow= 'hidden';
            document.body.style.height= '100%';
            document.documentElement.style.overflow= 'hidden'
        } else {
            document.body.style.overflow= 'auto';
            document.documentElement.style.overflow= 'auto'
            document.body.style.height= 'auto';
        }
    }
    
    render() {
        let {pageId, navActive, barActive, children} = this.props
        let {isShowLogin} = this.props.publicState

        return (
            <div id={pageId}>
                <Header
                    {...{
                        user: this.context.user,
                        navActive,
                        barActive
                    }}
                />
                {children}
                <Footer />
                <BackTop />
                {isShowLogin ? <Login /> : null}
            </div>
        )
    }
}

PublicModule.contextTypes = {
    user: PropTypes.object
}

export default connect(
    state => {
        let {
            publicState
        } = state

        return {
            publicState
        }
    },
    dispatch => bindActionCreators({...actions}, dispatch)
)(PublicModule)