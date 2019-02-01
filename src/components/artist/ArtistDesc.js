import React, { Component } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getDescData} from './ArtistRedux'

import Artist from './Artist'

class ArtistDesc extends Component {
    componentDidMount() {
        let {id} = this.props.match.params
        let {getDescData} = this.props

        getDescData(id)
    }
    
    render() {
        let {id} = this.props.match.params
        let {artistData, descData} = this.props.artist

        return (
            <Artist
                {...{
                    id,
                    curTab: 'desc'
                }}
            >
                <div className="description">
                    <h5><i>&nbsp;</i>{artistData.artist && artistData.artist.name}</h5>
                    <p>{descData.briefDesc}</p>
                </div>
            </Artist>
        )
    }
}

export default connect(
    state => {
        let {
            artist
        } = state

        return {
            artist
        }
    },
    dispatch => {
        return bindActionCreators({getDescData}, dispatch)
    }
)(ArtistDesc)