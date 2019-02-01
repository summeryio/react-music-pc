import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import Artist from './Artist'

import {formatDateHM} from 'common/js/util'

class ArtistSong extends Component {
    render() {
        let {artistData} = this.props.artist
        let {id} = this.props.match.params

        return (
            <Artist
                {...{
                    id,
                    curTab: 'song'
                }}
            >
                {
                    artistData.code === 200
                    ? (
                        <table id="m_table">
                            <tbody>
                                {
                                    artistData.hotSongs.map((song, i) => {
                                        let even = i % 2 === 0 ? 'even' : ''
                                        
                                        return (
                                            <tr className={even} key={song.id}>
                                                <td className="w1">
                                                    <span className="no">{i + 1}</span>
                                                    <i className="play"></i>
                                                </td>
                                                <td className="title">
                                                    <div className="ttc">   
                                                        <span className="t-hide text">
                                                            <Link to={`/songDetail/${song.id}`} className="t-udl name">{song.name}</Link>
                                                            {
                                                                song.alia.length ? (<em className="tip"> - ({song.alia[0]})</em>) : null
                                                            }
                                                            {
                                                                song.mv ? (<Link to={`/mvDetail/${song.mv}`}><i className="icon-table mv"></i></Link>) : null
                                                            }
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="w2 time">
                                                    <span>{formatDateHM(song.dt)}</span>
                                                    <div className="oper">
                                                        <a href="javascript: void(0);" className="icon-six add"></a>
                                                        <a href="javascript: void(0);" className="collect"></a>
                                                        <a href="javascript: void(0);" className="share"></a>
                                                        <a href="javascript: void(0);" className="download"></a>
                                                    </div>
                                                </td>
                                                <td className="w4"><div className="t-hide album"><Link to={`/albumDetail/${song.al.id}`} className="t-udl">{song.al.name}</Link></div></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    ) : null
                }
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
    }
)(ArtistSong)