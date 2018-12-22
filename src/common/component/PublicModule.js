import React, { Component } from 'react'

import Header from './Header'
import Footer from './Footer'
import BackTop from './BackTop'

import PropTypes from 'prop-types'

export default class PublicModule extends Component {
    render() {
        let {pageId, navActive, barActive, children} = this.props
        
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
            </div>
        )
    }
}

PublicModule.contextTypes = {
    user: PropTypes.object
}