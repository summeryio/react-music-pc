import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class SiderBarList extends Component {
    render() {
        let {
            changeTag,
            tagList,
            id
        } = this.props
        let tagID = parseInt(id)

        return (
            <div>
                <h4>云音乐特色榜</h4>
                <ul>
                    {
                        tagList.length > 0 ? tagList.slice(0, 4).map((tag, i) => {
                            return (
                                <li 
                                    key={tag.id}
                                    className={tagID === tag.id ? 'active' : ''}
                                    onClick={ev => {
                                        if (tagID === tag.id) return
                                        
                                        document.documentElement.scrollTop = 0
                                        document.body.scrollTop = 0
                                        changeTag(tag.id, tag.updateFrequency)
                                    }}
                                >
                                    <Link to={`/discover/topList/${tag.id}`}>
                                        <div className="pic"><img src={tag.coverImgUrl + '?param=40y40'} /></div>
                                        <div className="info">
                                            <p className="name">{tag.name}</p>
                                            <p className="tip">{tag.updateFrequency}</p>
                                        </div>
                                    </Link>
                                </li>
                            )
                        }) : null
                    }
                </ul>
                <h4>全球媒体榜</h4>
                <ul>
                    {
                        tagList.length > 0 ? tagList.slice(4).map(tag => {
                            return (
                                <li 
                                    key={tag.id}
                                    className={tagID === tag.id ? 'active' : ''}
                                    onClick={ev => {
                                        if (tagID === tag.id) return
                                        
                                        document.documentElement.scrollTop = 0
                                        document.body.scrollTop = 0
                                        changeTag(tag.id, tag.updateFrequency)
                                    }}
                                >
                                    <Link to={`/discover/topList/${tag.id}`}>
                                        <div className="pic"><img src={tag.coverImgUrl + '?param=40y40'} /></div>
                                        <div className="info">
                                            <p className="name">{tag.name}</p>
                                            <p className="tip">{tag.updateFrequency}</p>
                                        </div>
                                    </Link>
                                </li>
                            )
                        }) : null
                    }
                </ul>
            </div>
        )
    }
}