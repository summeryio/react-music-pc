import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './PublicRedux'
import {formatCommentDate, formatStringLine} from '../js/util'

import { Pagination } from 'antd'

class Comment extends Component {
    componentWillReceiveProps(nextProps) {
        let {id} = this.props
        let {getComment} = this.props.commentAction

        if (id !== nextProps.id) {
            getComment(nextProps.id, nextProps.urlType)
        }
    }
    
    componentDidMount() {
        let {id, urlType} = this.props
        let {getComment} = this.props.commentAction

        getComment(id, urlType)
    }
    
    render () {
        let {commentData} = this.props.publicState
        let {commentPaging} = this.props.commentAction
        let {id, urlType} = this.props
        let {total, comments, hotComments} = commentData
        let loaded = Object.keys(commentData).length > 0

        let hotComment = (loaded && hotComments && hotComments.length) ? hotComments.map(comment => {
            let time = formatCommentDate(comment.time)
            
            return (
                <dd key={comment.commentId}>
                    <div className="fl">
                        <Link to={`/user/${comment.user.userId}`}><img className="avatar" src={comment.user.avatarUrl + '?param=50y50'} /></Link>
                    </div>
                    <div className="right">
                        <p className="comment">
                            <Link to={`/user/${comment.user.userId}`} className="t-udl">{comment.user.nickname}</Link>
                            {
                                comment.user.vipType > 0
                                ? (<img className="icon-vip" src="https://p1.music.126.net/iOnYL-pAvH2LuQfStGOjfQ==/109951163709553273.png" alt=""/>)
                                : null
                            }
                            
                            ：<span dangerouslySetInnerHTML={{__html: formatStringLine(comment.content)}}></span>
                        </p>
                        {
                            comment.beReplied.length > 0
                            ? (
                                <div className="replay">
                                    <span className="arrow"><i className="bd">◆</i><i className="bg">◆</i></span>
                                    {
                                        comment.beReplied[0].status === 0
                                        ? (
                                            <p>
                                                <Link to={`/user/${comment.beReplied[0].user.userId}`} className="t-udl">{comment.user.nickname}</Link>
                                                ：<em dangerouslySetInnerHTML={{__html: formatStringLine(comment.beReplied[0].content)}}></em>
                                            </p>
                                        ) : <em>该评论已删除</em>
                                    }
                                    
                                </div>
                            ) : null
                        }
                        <div className="oper">
                            <p className="fl time">{time}</p>
                            <p className="fr">
                                <a href="javascript: void(0);" className="t-udl">
                                    <i className="icon-eight icon-like"></i>
                                    {comment.likedCount > 0 ? `(${comment.likedCount})` : null}
                                </a>
                                <i className="line">|</i>
                                <a href="javascript: void(0);" className="t-udl replay-btn">回复</a>
                            </p>
                        </div>
                    </div>
                </dd>
            )
        }) : null
        let commentsTemp = (loaded && comments.length) ? comments.map(comment => {
            let time = formatCommentDate(comment.time)
            
            return (
                <dd key={comment.commentId}>
                    <div className="fl">
                        <Link to={`/user/${comment.user.userId}`}><img className="avatar" src={comment.user.avatarUrl + '?param=50y50'} /></Link>
                    </div>
                    <div className="right">
                        <p className="comment">
                            <Link to={`/user/${comment.user.userId}`} className="t-udl">{comment.user.nickname}</Link>
                            {
                                comment.user.vipType > 0
                                ? (<img className="icon-vip" src="https://p1.music.126.net/iOnYL-pAvH2LuQfStGOjfQ==/109951163709553273.png" alt=""/>)
                                : null
                            }
                            ：<span dangerouslySetInnerHTML={{__html: formatStringLine(comment.content)}}></span>
                        </p>
                        {
                            comment.beReplied.length > 0
                            ? (
                                <div className="replay">
                                    <span className="arrow"><i className="bd">◆</i><i className="bg">◆</i></span>
                                    {
                                        comment.beReplied[0].status === 0
                                        ? (
                                            <p>
                                                <Link to={`/user/${comment.beReplied[0].user.userId}`} className="t-udl">{comment.beReplied[0].user.nickname}</Link>
                                                {
                                                    comment.beReplied[0].user.vipType > 0
                                                    ? (<img className="icon-vip" src="https://p1.music.126.net/iOnYL-pAvH2LuQfStGOjfQ==/109951163709553273.png" alt=""/>)
                                                    : null
                                                }
                                                ：<em dangerouslySetInnerHTML={{__html: formatStringLine(comment.beReplied[0].content)}}></em>
                                            </p>
                                        ) : <em>该评论已删除</em>
                                    }
                                    
                                </div>
                            ) : null
                        }
                        <div className="oper">
                            <p className="fl time">{time}</p>
                            <p className="fr">
                                <a href="javascript: void(0);" className="t-udl">
                                    <i className="icon-eight icon-like"></i>
                                    {comment.likedCount > 0 ? `(${comment.likedCount})` : null}
                                </a>
                                <i className="line">|</i>
                                <a href="javascript: void(0);" className="t-udl replay-btn">回复</a>
                            </p>
                        </div>
                    </div>
                </dd>
            )
        }) : null
        
        return (
            <div id="comment">
                <div className="comment-oper">
                    <div className="top"><h3>评论</h3><p className="sont-num">共{commentData.total}条评论</p></div>
                    <div className="cont">
                        <div className="fl">
                            <img className="user-avatar" src={require('../img/default_avatar.jpg')} />
                        </div>
                        <div className="right">
                            <div className="text"><textarea placeholder="评论"></textarea></div>
                            <div className="operation">
                                <div className="fl">
                                    <i className="icon-six icon-emoji"></i>
                                    <i className="icon-six icon-find"></i>
                                </div>
                                <div className="fr">
                                    <span className="num">140</span>
                                    <a className="icon-button2 btn" href="javascript: void(0);">评论</a>
                                </div>
                                <div className="emoji-cont"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="comment-list">
                    {
                        hotComment && (
                            <dl className="hot-comment">
                                <dt>精彩评论</dt>
                                {hotComment}
                            </dl>
                        )
                    }
                    {
                        commentsTemp && (
                            <dl>
                                <dt>最新评论({commentData.total})</dt>
                                {commentsTemp}
                            </dl>
                        )
                    }
                </div>
                {
                    commentsTemp && total > 20
                    ? (
                        <div id="paging">
                            <Pagination 
                                defaultCurrent={1} 
                                total={commentData.total}
                                pageSize={20}
                                size="small"
                                onChange={(page, pageSize) => {
                                    commentPaging(id, page, urlType)
                                }}
                            />
                        </div>
                    ) : null
                }
            </div>
        )
    }
}

export default connect(
    state => {
        let {
            publicState
        } = state

        return {
            publicState
        }
    },
    dispatch => {
        return {
            commentAction: bindActionCreators({...actions}, dispatch)
        }
    }
)(Comment)