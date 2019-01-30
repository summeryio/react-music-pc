import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from 'common/component/PublicRedux'
import RouterIndex from 'router/RouterIndex'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {
                code: 301
            }
        }
    }

    getChildContext() {
        let {loginStatus} = this.props.publicState
        
        return {
            user: loginStatus
        }
    }

    componentDidMount() {
        let {getLoginStatus} = this.props.appAction

        getLoginStatus()
    }

    render() {
        let {loginStatus} = this.props.publicState
        
        return (
            <RouterIndex user={loginStatus}/>
        )
    }
}

App.childContextTypes = {
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
    dispatch => {
        return {
            appAction: bindActionCreators({...actions}, dispatch)
        }
    }
)(App)