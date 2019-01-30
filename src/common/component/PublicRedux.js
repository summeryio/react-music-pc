import axios from 'axios'
import {URL_HEADER, HTTP_SUCCESS_CODE} from 'common/js/constant'

let initialState = {
    loginStatus: {},
    searchSuggest: {},
    isShowLogin: false,
    commentData: {}
}

const GET_LOGIN_STATUS = 'music/common/component/GET_LOGIN_STATUS'
const GET_SEARCH_SUGGEST = 'music/common/component/GET_SEARCH_SUGGEST'
const IS_SHOW_LOGIN = 'music/common/component/SHOW_LOGIN'
const GET_COMMENT = 'music/common/component/GET_COMMENT'
const COMMENT_PAGING = 'music/common/component/COMMENT_PAGING'

// 获取登录状态
export const getLoginStatus = () => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/login/status?timestamp=${new Date().getTime()}`, {withCredentials: true}).then((res) => {
        let {data} = res

        if (data.code === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_LOGIN_STATUS,
                loginStatus: data
            })
        }
    }).catch(error => {
        // console.log(error);
        dispatch({
            type: GET_LOGIN_STATUS,
            loginStatus: {
                code: 301
            }
        })
    })
}

// 退出登录
export const logout = () => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/logout?timestamp=${new Date().getTime()}`, {withCredentials: true}).then((res) => {
        let {data} = res

        if (data.code === HTTP_SUCCESS_CODE) {
            dispatch(getLoginStatus())
        }
    }).catch(error => {
        console.log(error);
    })
}

// 显示登录模块
export const showLogin = (status) => (dispatch, getState) => {
    dispatch({
        type: IS_SHOW_LOGIN,
        isShowLogin: status
    })
}

// 登录操作
export const handleLogin = (account, password) => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/login/cellphone?phone=${account}&password=${password}&timestamp=${new Date().getTime()}`, {withCredentials: true}).then((res) => {
        let {data} = res

        if (data.code === HTTP_SUCCESS_CODE) {
            dispatch(getLoginStatus())
            dispatch(showLogin(false))
        }
    }).catch(error => {
        console.log(error);
        dispatch({
            type: GET_LOGIN_STATUS,
            loginStatus: {
                code: 509
            }
        })
    })
}


// 头部搜索建议
export const getSearchSuggest = (val) => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/search/suggest?keywords=${val}`).then((res) => {
        let {data} = res

        if (data.code === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_SEARCH_SUGGEST,
                searchSuggest: data.result
            })
        }
    }).catch(error => {
        console.log(error);
    })
}

// 评论数据
export const getComment = (id, urlType) => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/comment/${urlType}?id=${id}`).then((res) => {
        let {data} = res

        if (data.code === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_COMMENT,
                commentData: data
            })
        }
    }).catch(error => {
        console.log(error);
    })
}

// 评论分页
export const commentPaging = (id, nowPage, urlType) => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/comment/${urlType}?id=${id}&offset=${(nowPage - 1) * 20}`).then((res) => {
        let {data} = res

        if (data.code === HTTP_SUCCESS_CODE) {
            dispatch({
                type: COMMENT_PAGING,
                commentData: data
            })
        }
    }).catch(error => {
        console.log(error);
    })
}

export default function publicState(state = initialState, action) {
    let {
        type,
        loginStatus,
        isShowLogin,
        searchSuggest,
        commentData
    } = action

    switch (type) {
        case GET_LOGIN_STATUS:
            return {...state, loginStatus}
            break
        case IS_SHOW_LOGIN:
            return {...state, isShowLogin}
            break
        case GET_SEARCH_SUGGEST:
            return {...state, searchSuggest}
            break
        case GET_COMMENT:
            return {...state, commentData}
            break
        case COMMENT_PAGING:
            return {...state, commentData}
            break
        default:
            return state
    }
}