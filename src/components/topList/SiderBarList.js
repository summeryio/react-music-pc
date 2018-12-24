import React, { Component } from 'react'


export default class SiderBarList extends Component {
    render() {
        let {tagList} = this.props

        return (
            <div>
                <h4>云音乐特色榜</h4>
                <ul>
                    {
                        tagList.length > 0 ? tagList.slice(0, 4).map((tag, i) => {
                            return (
                                <li key={tag.id} className={i === 0 ? 'active' : ''}>
                                    <div className="pic"><img src={tag.coverImgUrl} /></div>
                                    <div className="info">
                                        <p className="name">{tag.name}</p>
                                        <p className="tip">{tag.updateFrequency}</p>
                                    </div>
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
                                <li key={tag.id}>
                                    <div className="pic"><img src={tag.coverImgUrl} /></div>
                                    <div className="info">
                                        <p className="name">{tag.name}</p>
                                        <p className="tip">{tag.updateFrequency}</p>
                                    </div>
                                </li>
                            )
                        }) : null
                    }
                </ul>
            </div>
        )
    }
}