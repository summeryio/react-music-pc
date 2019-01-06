import React, { Component } from 'react'

export default class Comment extends Component {
    render () {
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
                    <dl>
                        <dt>精彩评论</dt>
                        <dd>
                            <div className="fl">
                                <a href="#"><img className="avatar" src="https://p1.music.126.net/_SN6oeoCHt1KGkwpwRjcWA==/109951163197869459.jpg?param=50y50" alt=""/></a>
                            </div>
                            <div className="right">
                                <p className="comment">
                                    <a href="#" className="t-udl">糊涂了前半生</a>
                                    <img className="icon-vip" src="https://p1.music.126.net/iOnYL-pAvH2LuQfStGOjfQ==/109951163709553273.png" alt=""/>
                                    ：能不能，能不能，我就问你能不能把年度总结推送出来：能不能，能不能，我就问你能不能把年度总结推送出来：能不能，能不能，我就问你能不能把年度总结推送出来：能不能，能不能，我就问你能不能把年度总结推送出来<img src="http://s1.music.126.net/style/web2/emt/emoji_363.png" />
                                </p>
                                <div className="replay">
                                    <span className="arrow"><i className="bd">◆</i><i className="bg">◆</i></span>
                                    <a href="#" className="t-udl">糊涂了前半生</a>
                                    ：居然看到了羽肿！！纯音赛高
                                </div>
                                <div className="oper">
                                    <p className="fl time">1月3日 11:55</p>
                                    <p className="fr">
                                        <a href="javascript: void(0);" className="t-udl"><i className="icon-eight icon-like"></i>(12)</a>
                                        <i className="line">|</i>
                                        <a href="javascript: void(0);" className="t-udl replay-btn">回复</a>
                                    </p>
                                </div>
                            </div>
                        </dd>
                    </dl>
                </div>
            </div>
        )
    }
}
