import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getAlbumData} from './ArtistRedux'

import Artist from './Artist'

import { Pagination } from 'antd'
import {formatDateYMD} from 'common/js/util'

class ArtistAlbum extends Component {
    componentDidMount() {
        let {id} = this.props.match.params
        let {getAlbumData} = this.props

        getAlbumData(id, 1)
    }
    
    render() {
        let {id} = this.props.match.params
        let {albumData} = this.props.artist
        let {getAlbumData} = this.props

        return (
            <Artist
                {...{
                    id,
                    curTab: 'album'
                }}
            >
                <ul className="album-list">
                    {
                        albumData.code === 200 && albumData.hotAlbums.length
                        ? (
                            albumData.hotAlbums.map(album => {
                                return (
                                    <li key={album.id}>
                                        <div className="pic">
                                            <img src={album.picUrl + '?param=120y120'} alt={album.name} />
                                            <Link to={`/albumDetail/${album.id}`} title={album.name} className="icon-coverall mask"></Link>
                                            <a href="#" className="icon-seven play"></a>
                                        </div>
                                        <div className="info">
                                            <p className="t-hide name"><Link to={`/albumDetail/${album.id}`} className="t-udl">{album.name}</Link></p>
                                            <p className="time">{formatDateYMD(albumData.publishTime)}</p>
                                        </div>
                                    </li>
                                )
                            })
                        ) : <div className="empty">暂无专辑</div>
                    }
                </ul>
                {
                    albumData.code === 200 && albumData.artist.albumSize > 12
                    ? (
                        <div id="paging">
                            <Pagination 
                                defaultCurrent={1} 
                                total={albumData.artist.albumSize}
                                pageSize={12}
                                size="small"
                                onChange={(page, pageSize) => {
                                    getAlbumData(id, page)
                                }}
                            />
                        </div>
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
    },
    dispatch => {
        return bindActionCreators({getAlbumData}, dispatch)
    }
)(ArtistAlbum)