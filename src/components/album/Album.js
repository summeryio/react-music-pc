import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './AlbumRedux'
import { Pagination } from 'antd'

import PublicModule from 'common/component/PublicModule'

class Album extends Component {
    componentDidMount() {
        let {getAlbumData} = this.props.albumAction

        getAlbumData(0)
    }
    
    render () {
        let {getAlbumData} = this.props.albumAction
        let {albumData} = this.props.album
        let albumTemp = Object.keys(albumData).length > 0 ? albumData.albums.map(album => {
            return (
                <li key={album.id}>
                    <div className="pic">
                        <img src={album.picUrl + '?param=130y130'} alt={album.name} />
                        <a href="#" title={album.name} className="icon-coverall mask"></a>
                        <a href="#" className="icon-seven play"></a>
                    </div>
                    <div className="info">
                        <p className="t-hide name"><a href="#" className="t-udl">{album.name}</a></p>
                        <p className="t-hide singer"><span><a href="#" className="t-udl">{album.artist.name}</a></span></p>
                    </div>
                </li>
            )
        }) : null
        
        return (
            <PublicModule 
                {...{
                    pageId: 'album_page',
                    navActive: '/',
                    barActive: '/discover/album'
                }}
            >
                <main id="main" className="g-bd">
                    <div className="inner">
                        <div className="album-title"><h3>新碟上架</h3></div>
                        <ul className="album-list">{albumTemp}</ul>
                        <div id="paging">
                            <Pagination 
                                defaultCurrent={1} 
                                total={albumData.total}
                                pageSize={35}
                                onChange={(page, pageSize) => {
                                    getAlbumData(page)
                                }}
                            />
                        </div>
                    </div>
                </main>
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