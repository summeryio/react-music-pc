import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from './MyRedux'

class My extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        let {getPlaylist} = this.props.myAction
        let {userId} = JSON.parse(sessionStorage.getItem('data'))

        getPlaylist(userId)
    }

    render() {
        let {playlist} = this.props.my

        if (playlist.length) {
            return <Redirect to={`/my/playlist/${playlist[0].id}`}/>
        }

        return (
            <div></div>
        )
    }
}

My.contextTypes = {
    user: PropTypes.object
}

export default connect(
    state => {
        let {
            my
        } = state

        return {
            my
        }
    },
    dispatch => {
        return {
            myAction: bindActionCreators({...actions}, dispatch)
        }
    }
)(My)