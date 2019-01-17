import axios from 'axios'
import {URL_HEADER, HTTP_SUCCESS_CODE} from 'common/js/constant'

let initialState = {
    searchSuggest: {},
    commentData: {}
}

const GET_SEARCH_SUGGEST = 'music/common/component/GET_SEARCH_SUGGEST'
const GET_COMMENT = 'music/common/component/GET_COMMENT'
const COMMENT_PAGING = 'music/common/component/COMMENT_PAGING'

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
    axios.get(`${URL_HEADER}/comment/${urlType}?id=${id}&offset=${nowPage}`).then((res) => {
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
        searchSuggest,
        commentData
    } = action

    switch (type) {
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