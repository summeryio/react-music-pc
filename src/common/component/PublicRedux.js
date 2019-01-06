import axios from 'axios'
import {URL_HEADER, HTTP_SUCCESS_CODE} from 'common/js/constant'

let initialState = {
    searchSuggest: {},
    commentData: {}
}

const GET_SEARCH_SUGGEST = 'music/common/component/GET_SEARCH_SUGGEST'
const GET_COMMENT = 'music/common/component/GET_COMMENT'

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

export const getComment = (id) => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/comment/playlist?id=${id}`).then((res) => {
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
        default:
            return state
    }
}