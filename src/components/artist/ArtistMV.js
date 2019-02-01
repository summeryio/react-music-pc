import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getMVData} from './ArtistRedux'

import Artist from './Artist'

class ArtistMV extends Component {
    componentDidMount() {
        let {id} = this.props.match.params
        let {getMVData} = this.props

        getMVData(id)
    }
    
    render() {
        let {id} = this.props.match.params
        let {mvData} = this.props.artist

        return (
            <Artist
                {...{
                    id,
                    curTab: 'mv'
                }}
            >
                <ul className="mv-list">
                    {
                        mvData.code === 200 && mvData.mvs.length
                        ? mvData.mvs.map(mv => {
                            return (
                                <li key={mv.id}>
                                    <div className="pic">
                                        <img src={mv.imgurl && mv.imgurl + '?param=138y104'} />
                                        <Link to={`/mvDetail/${mv.id}`} className="mask"></Link>
                                        <Link to={`/mvDetail/${mv.id}`} className="icon-seven play"></Link>
                                    </div>
                                    <p className="t-hide desc"><Link to={`/mvDetail/${mv.id}`} className="t-udl">{mv.name}</Link></p>
                                </li>
                            )
                        }) : <div className="empty">暂无MV</div>
                    }
                </ul>
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
        return bindActionCreators({getMVData}, dispatch)
    }
)(ArtistMV)