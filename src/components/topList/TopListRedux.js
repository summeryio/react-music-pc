import axios from 'axios'
import {URL_HEADER, HTTP_SUCCESS_CODE} from 'common/js/constant'

let initialState = {
    tagList: []
}

const GET_TOP_LIST_TAG = 'music/TopListRedux/GET_TOP_LIST_TAG'


export const getTopListTag = () => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/toplist`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_TOP_LIST_TAG,
                tagList: res.data.list
            })
        }
    }).catch(error => {
        console.log(error);
    })
}


export default function topList(state = initialState, action) {
    let {
        type,
        tagList
    } = action

    switch (type) {
        case GET_TOP_LIST_TAG:
            return {...state, tagList}
            break

        default:
            return state
    }
}