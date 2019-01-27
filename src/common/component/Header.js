import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './PublicRedux'

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchValue: '',
            hideSearchResult: true
        }

        this.changeSearchVal = this.changeSearchVal.bind(this)
    }

    changeSearchVal(val) {
        this.setState({
            searchValue: val
        })

        if (val !== '') {
            this.props.getSearchSuggest(val)
        }
        
    }
    
    componentDidMount() {
        document.addEventListener('click', function () {
            this.setState({hideSearchResult: false})
        }.bind(this))
    }

    componentWillUnmount = () => {
        this.setState = (state, callback)=>{
            return
        }
    }
    
    render() {
        let {
            user,
			searchSuggest,
			navActive,
			barActive
        } = this.props
        let {changeSearchVal} = this
		let {searchValue, hideSearchResult} = this.state

        // 搜索建议
        let suggestTitleObj = {
            'songs': '单曲',
            'albums': '专辑',
            'artists': '歌手',
            'playlists': '歌单',
            'mvs': '视频',
            'songs': '单曲'
        }
        let searchSuggestLen = Object.keys(searchSuggest).length
        let searchSuggestTemp = searchSuggestLen > 0
        ? searchSuggest.order.map((name, i) => {
            let first = i === 0 ? 'item-first' : ''
			let odd = i % 2 !== 0 ? 'item-odd' : ''
			
            return (
                <div className={`item ${first} ${odd} item-${name}`} key={i}>
                    <h6 className="key"><i className="icon-three"></i><em>{suggestTitleObj[name]}</em></h6>
                    <ul className="value">
                        {
                            searchSuggest[name] ? searchSuggest[name].map(data => {
                                let reg = new RegExp(searchValue, 'gi')
								let n = data.name.replace(reg, `<span>${searchValue}</span>`)
                                
                                if (name === 'songs') {
                                    let m = data.artists[0].name.replace(/happy/gi, `<span>happy</span>`)
                                    let s = n + '-' + m

                                    return (
                                        <li key={data.id}><Link to={`/songDetail/${data.id}`} dangerouslySetInnerHTML={{__html: s}}></Link></li>
                                    )
                                } else if (name === 'artists') {
                                    return (
                                        <li key={data.id}><Link to={`/artistDetail/${data.id}`} dangerouslySetInnerHTML={{__html: n}}></Link></li>
                                    )
                                } else if (name === 'albums') {
                                    let m = data.artist.name.replace(/happy/gi, `<span>happy</span>`)
                                    let s = n + '-' + m
                                    
                                    return (
                                        <li key={data.id}><Link to={`/albumDetail/${data.id}`} dangerouslySetInnerHTML={{__html: s}}></Link></li>
                                    )
                                } else if (name === 'mvs') {
                                    return (
                                        <li key={data.id}><Link to={`/mvDetail/${data.id}`} dangerouslySetInnerHTML={{__html: 'MV:' + n}}></Link></li>
                                    )
                                } else if (name === 'playlists') {
                                    return (
                                        <li key={data.id}><Link to={`/playDetail/${data.id}`} dangerouslySetInnerHTML={{__html: n}}></Link></li>
                                    )
                                } else {
                                    return (
                                        <li key={data.id}><a href="#" dangerouslySetInnerHTML={{__html: n}}></a></li>
                                    )
                                }
                            }) : null
                        }
                    </ul>
                </div>
            )
		}) : null
		
        return (
            <header id="header_top">
				<div className="inner">
					<div className="container clearfix">
						<div className="fl">
							<h1 className="fl logo icon-header">
								<Link to="/"></Link>
							</h1>
							<ul className="fl nav">
								<li>
									<Link 
										to="/" 
										className={navActive && navActive === '/' ? 'nav-active' : ''}
									>发现音乐</Link>
									{navActive && navActive === '/' ? <i className="icon-header icon-arrow"></i> : null}
								</li>
								<li>
									<Link 
										to="/my" 
										className={navActive && navActive === '/my' ? 'nav-active' : ''}
									>我的音乐</Link>
									{navActive && navActive === '/my' ? <i className="icon-header icon-arrow"></i> : null}
								</li>
								<li>
									<Link 
										to="/friend" 
										className={navActive && navActive === '/friend' ? 'nav-active' : ''}
									>朋友</Link>
									{navActive && navActive === '/friend' ? <i className="icon-header icon-arrow"></i> : null}
								</li>
								<li><Link to="/mall">商城</Link></li>
								<li><Link to="/">音乐人</Link></li>
								<li><Link to="/">下载客户端</Link><i className="icon-header icon-hot"></i></li>
							</ul>
						</div>
						<div className="fr">
							<div className="search fl">
								<i className="icon-header icon-search"></i>
								<input type="text" placeholder="音乐/视频/电台/用户"
									onChange={ev => changeSearchVal(ev.target.value)}
									onClick={ev => {
										ev.nativeEvent.stopImmediatePropagation()
										this.setState({hideSearchResult: true})
									}}
								/>
								{
									(this.state.searchValue !== '' && searchSuggestLen > 0 && hideSearchResult)
									? (
										<div className="search-result" ref="search_result">
											<h5 className="title"><a href="javascript:;">搜“{searchValue}” 相关用户</a>></h5>
											{searchSuggestTemp}
										</div>
									) : null
								}
								
							</div>
							<div className="submit icon-header fl">视频投稿</div>
							<div className="user fl">
								<div className="btn">
									{
										user.code === 200
										? <img src={user.data.profile.avatarUrl} alt={user.data.profile.nickname} />
										: <a href="javascript:;" className="t-udl">登录</a>
									}
									<i className="icon-header icon-arrow"></i>
								</div>
								{
									user.code === 200
									? (
										<ul className="list logined">
											<li><a href="#"><i className="icon-user icon-mypage"></i>我的主页</a></li>
											<li><a href="#"><i className="icon-user icon-msg"></i>我的消息</a></li>
											<li><a href="#"><i className="icon-user icon-level"></i>我的等级</a></li>
											<li className="line"><a href="#"><i className="icon-user icon-vip"></i>VIP会员</a></li>
											<li><a href="#"><i className="icon-user icon-setting"></i>个人设置</a></li>
											<li className="line"><a href="#"><i className="icon-user icon-prove"></i>实名认证</a></li>
											<li><a href="#"><i className="icon-user icon-quit"></i>退出</a></li>
										</ul>
									)
									: (
										<ul className="list not-login">
											<li><a href="#"><i className="icon-user icon-phone"></i>手机号登录</a></li>
											<li><a href="#"><i className="icon-user icon-wx"></i>微信登录</a></li>
											<li><a href="#"><i className="icon-user icon-qq"></i>QQ登录</a></li>
											<li><a href="#"><i className="icon-user icon-sina"></i>新浪微博登录</a></li>
											<li><a href="#"><i className="icon-user icon-163"></i>网易邮箱帐号登录</a></li>
										</ul>
									)
								}
							</div>
						</div>
					</div>
				</div>
				<div className="bar">
					{
						navActive && navActive === '/'
						? (
							<ul>
								<li
									className={barActive && barActive === '/discover' ? 'bar-active' : ''}
								><Link to="/discover">推荐</Link></li>
								<li
									className={barActive && barActive === '/discover/topList' ? 'bar-active' : ''}
								><Link to={`/discover/topList/${19723756}`}>排行榜</Link></li>
								<li
									className={barActive && barActive === '/discover/playList' ? 'bar-active' : ''}
								><Link to="/discover/playList/全部">歌单</Link></li>
								{/* <li><Link to="/">主播电台</Link></li>
								<li><Link to="/">歌手</Link></li> */}
								<li
									className={barActive && barActive === '/discover/album' ? 'bar-active' : ''}
								><Link to="/discover/album">新碟上架</Link></li>
							</ul>
						) : null
					}
				</div>
            </header>
        )
    }
}

export default connect(
    state => {
        let {
            publicState: {searchSuggest}
        } = state

        return {
            searchSuggest
        }
    },
    dispatch => bindActionCreators({...actions}, dispatch)
)(Header)