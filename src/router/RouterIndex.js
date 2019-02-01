import React, { Component } from 'react'
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import AutomaticToTop from 'common/component/AutomaticToTop'

import Home from 'components/home/Home'
import Friend from 'components/friend/Friend'
import TopList from 'components/topList/TopList'
import PlayList from 'components/playList/PlayList'
import Album from 'components/album/Album'

import PlayDetail from 'components/musicDetail/PlayDetail'
import SongDetail from 'components/musicDetail/SongDetail'
import AlbumDetail from 'components/musicDetail/AlbumDetail'
import MVDetail from 'components/musicDetail/MVDetail'
import RecommendDetail from 'components/musicDetail/RecommendDetail'

import My from 'components/my/My'
import MyPlaylist from 'components/my/MyPlaylist'

import User from 'components/user/User'

import ArtistSong from 'components/artist/ArtistSong'
import ArtistAlbum from 'components/artist/ArtistAlbum'
import ArtistMV from 'components/artist/ArtistMV'
import ArtistDesc from 'components/artist/ArtistDesc'

export default class RouterIndex extends Component {
  render() {
    // exact: 加上这个属性，那么就只会匹配相应组件
    return (
        <Router>
            <AutomaticToTop>
                <Switch>
                    <Route path="/" exact component={Home} ammeter/>
                    <Route path="/friend" component={Friend} />
                    <Route path="/discover" exact component={Home} />
                    <Route path="/discover/topList/:id" component={TopList} />
                    <Route path="/discover/playList" exact component={PlayList} />
                    <Route path="/discover/playList/:cat" component={PlayList} />
                    <Route path="/discover/album" component={Album} />

                    <Route path="/playDetail/:id" component={PlayDetail} />
                    <Route path="/songDetail/:id" component={SongDetail} />
                    <Route path="/albumDetail/:id" component={AlbumDetail} />
                    <Route path="/mvDetail/:id" component={MVDetail} />
                    <Route path="/recommendDetail" component={RecommendDetail} />

                    
                    <Route path="/my" exact component={My}/>
                    <Route path="/my/playlist/:id" component={MyPlaylist}/>

                    <Route path="/user/:id" component={User}/>

                    <Route path="/artist/:id" exact component={ArtistSong}/>
                    <Route path="/artist/song/:id" component={ArtistSong}/>
                    <Route path="/artist/album/:id" component={ArtistAlbum}/>
                    <Route path="/artist/mv/:id" component={ArtistMV}/>
                    <Route path="/artist/desc/:id" component={ArtistDesc}/>
                </Switch>
            </AutomaticToTop>
        </Router>
    )
  }
}
