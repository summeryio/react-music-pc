import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './ArtistRedux'

import PublicModule from 'common/component/PublicModule'

import {splitArray} from 'common/js/util'

class Artist extends Component {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.id !== nextProps.id) {
            let {getArtistData, getSimiArtist} = this.props.artistAction
            
            getArtistData(nextProps.id)
            getSimiArtist(nextProps.id)
        }
    }

    componentDidMount() {
        let {id} = this.props
        let {getArtistData, getSimiArtist} = this.props.artistAction

        getArtistData(id)
        getSimiArtist(id)
    }
    
    render() {
        let {id, curTab} = this.props
        let {artistData, simiArtist} = this.props.artist
        let loaded = artistData.code === 200
        let artist =  loaded ? artistData.artist : {}
        
        let tabData = {
            'song': '热门作品',
            'album': '所有专辑',
            'mv': '相关MV',
            'desc': '艺人介绍'
        }

        return (
            <PublicModule 
                {...{
                    pageId: 'artist_page',
                    navActive: '/'
                }}
            >
                <div id="main" className="g-bd artist-bd">
                    <div className="main-content">
                        <div className="inner">
                            <div className="artist-detail">
                                <h3 className="name">{artist.name}</h3>
                                <div className="pic">
                                    <img src={artist.picUrl && artist.picUrl + '?param=640y300'} />
                                    {artist.picUrl ? <span className="mask"></span> : null}
                                    {artist.accountId ? <Link to={`/user/${artist.accountId}`} className="icon-seven home"></Link> : null}
                                </div>
                                <ul className="tab">
                                    {
                                        Object.keys(tabData).map((key) => {
                                            let cls = curTab === key ? 'active' : ''
                                            
                                            return (
                                                <li className={cls} key={key}><Link to={`/artist/${key}/${id}`}>{tabData[key]}</Link></li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            {this.props.children}
                        </div>
                    </div>
                    <div className="main-siderBar">
                        <div className="simi-singer">
                            <h4>相似歌手</h4>
                            <ul>
                                {
                                    simiArtist.code === 200 && simiArtist.artists
                                    ? simiArtist.artists.map(artist => {
                                        return (
                                            <li key={artist.id}>
                                                <Link to={`/artist/${artist.id}`} className="pic">
                                                    <img src={artist.img1v1Url && artist.img1v1Url + '?param=50y50'} />
                                                </Link>
                                                <a to={`/artist/${artist.id}`} className="t-hide name">{artist.name}</a>
                                            </li>
                                        )
                                    }) : null
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </PublicModule>
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
        return {
            artistAction: bindActionCreators({...actions}, dispatch)
        }
    }
)(Artist)