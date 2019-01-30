import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './AlbumRedux'
import { Pagination } from 'antd'

import PublicModule from 'common/component/PublicModule'
import Loading from 'common/component/Loading'

class Album extends Component {
    componentDidMount() {
        let {getAlbumData} = this.props.albumAction

        getAlbumData(1)
    }
    
    render () {
        let {getAlbumData} = this.props.albumAction
        let {albumData} = this.props.album
        let loaded = albumData.code === 200
        
        return (
            <PublicModule 
                {...{
                    pageId: 'album_page',
                    navActive: '/',
                    barActive: '/discover/album'
                }}
            >
                <div id="main" className="g-bd">
                    <div className="inner">
                        <div className="album-title"><h3>新碟上架</h3></div>
                        <ul className="album-list">
                            {
                                loaded
                                ? (
                                    albumData.albums.map(album => {
                                        return (
                                            <li key={album.id}>
                                                <div className="pic">
                                                    <img src={album.picUrl + '?param=130y130'} alt={album.name} />
                                                    <Link to={`/albumDetail/${album.id}`} title={album.name} className="icon-coverall mask"></Link>
                                                    <a href="#" className="icon-seven play"></a>
                                                </div>
                                                <div className="info">
                                                    <p className="t-hide name"><Link to={`/albumDetail/${album.id}`} className="t-udl">{album.name}</Link></p>
                                                    <p className="t-hide singer"><span><a href="#" className="t-udl">{album.artist.name}</a></span></p>
                                                </div>
                                            </li>
                                        )
                                    })
                                ) : <Loading />
                            }
                        </ul>
                        {
                            loaded
                            ? (
                                <div id="paging">
                                    <Pagination 
                                        defaultCurrent={1} 
                                        total={albumData.total}
                                        pageSize={35}
                                        size="small"
                                        onChange={(page, pageSize) => {
                                            getAlbumData(page)
                                        }}
                                    />
                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </PublicModule>
        )
    }
}

export default connect(
    state => {
        let {
            album
        } = state

        return {
            album
        }
    },
    dispatch => {
        return {
            albumAction: bindActionCreators({...actions}, dispatch)
        }
    }
)(Album)