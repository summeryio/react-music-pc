import React, { Component } from 'react'
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import Home from 'components/home/Home'
import My from 'components/my/My'
import Friend from 'components/friend/Friend'
import TopList from 'components/topList/TopList'
import PlayList from 'components/playList/PlayList'
import Album from 'components/album/Album'

// user在这里获取在传递下去

export default class RouterIndex extends Component {
  render() {
    // exact: 加上这个属性，那么就只会匹配相应组件
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} ammeter/>
                <Route path="/my" component={My}/>
                <Route path="/friend" component={Friend} />
                <Route path="/discover" exact component={Home} />
                <Route path="/discover/topList/:id" component={TopList} />
                <Route path="/discover/playList/:cat" component={PlayList} />
                <Route path="/discover/album" component={Album} />
            </Switch>
        </Router>
    )
  }
}
