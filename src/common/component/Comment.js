import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './PublicRedux'
import {formatCommentDate} from '../js/util'

import Loading from 'common/component/Loading'

class Comment extends Component {
    componentWillReceiveProps(nextProps) {
        let {id} = this.props
        let {getComment} = this.props.commentAction

        if (id !== nextProps.id) {
            getComment(nextProps.id)
        }
    }
    
    componentDidMount() {
        let {id} = this.props
        let {getComment} = this.props.commentAction

        getComment(id)
    }
    
    render () {
        let {commentData} = this.props.publicState
        
        let hotComment = (Object.keys(commentData).length > 0 && commentData.hotComments.length > 0) ? commentData.hotComments.map(comment => {
            let time = formatCommentDate(comment.time)
            
            return (
                <dd key={comment.commentId}>
                    <div className="fl">
                        <Link to={`/user${comment.user.userId}`}><img className="avatar" src={comment.user.avatarUrl} /></Link>
                    </div>
                    <div className="right">
                        <p className="comment">
                            <Link to={`/user${comment.user.userId}`} className="t-udl">{comment.user.nickname}</Link>
                            {
                                comment.user.vipType > 0
                                ? (<img className="icon-vip" src="https://p1.music.126.net/iOnYL-pAvH2LuQfStGOjfQ==/109951163709553273.png" alt=""/>)
                                : null
                            }
                            
                            ：<span dangerouslySetInnerHTML={{__html: comment.content}}></span>
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
                                                <Link to={`/user${comment.beReplied[0].user.nickname}`} className="t-udl">{comment.user.nickname}</Link>
                                                ：<em dangerouslySetInnerHTML={{__html: comment.beReplied[0].content}}></em>
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
        let comments = Object.keys(commentData).length > 0 ? commentData.comments.map(comment => {
            let time = formatCommentDate(comment.time)
            
            return (
                <dd key={comment.commentId}>
                    <div className="fl">
                        <Link to={`/user${comment.user.userId}`}><img className="avatar" src={comment.user.avatarUrl} /></Link>
                    </div>
                    <div className="right">
                        <p className="comment">
                            <Link to={`/user${comment.user.userId}`} className="t-udl">{comment.user.nickname}</Link>
                            {
                                comment.user.vipType > 0
                                ? (<img className="icon-vip" src="https://p1.music.126.net/iOnYL-pAvH2LuQfStGOjfQ==/109951163709553273.png" alt=""/>)
                                : null
                            }
                            
                            ：<span dangerouslySetInnerHTML={{__html: comment.content}}></span>
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
                                                <Link to={`/user${comment.beReplied[0].user.nickname}`} className="t-udl">{comment.user.nickname}</Link>
                                                ：<em dangerouslySetInnerHTML={{__html: comment.beReplied[0].content}}></em>
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
                    <div className="top"><h3>评论</h3><p className="sont-num">共308条评论</p></div>
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
                        hotComment
                        ? (
                            <dl>
                                <dt>精彩评论</dt>
                                {hotComment}
                            </dl>
                        ) : null
                    }
                    <br/>
                    <br/>
                    <dl>
                        <dt>最新评论</dt>
                        {comments}
                    </dl>
                </div>
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
