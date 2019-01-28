import axios from 'axios'
import {URL_HEADER, HTTP_SUCCESS_CODE} from 'common/js/constant'

let initialState = {
    playListData: {},
    catListData: {}
}

const GET_PLSY_LIST = 'music/TopListRedux/GET_PLSY_LIST'
const GET_CAT_LIST = 'music/TopListRedux/GET_CAT_LIST'

export const getPlayList = (order, cat, nowPage) => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/top/playlist?limit=35&order=${order}&cat=${encodeURI(cat)}&offset=${(nowPage - 1) * 35}`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_PLSY_LIST,
                playListData: res.data
            })
        }
    }).catch(error => {
        console.log(error);
    })
}

export const getCatList = () => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/playlist/catlist`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_CAT_LIST,
                catListData: res.data
            })
        }
    }).catch(error => {
        console.log(error);
    })
}


export default function playList(state = initialState, action) {
    let {
        type,
        playListData,
        catListData
    } = action

    switch (type) {
        case GET_PLSY_LIST:
            return {...state, playListData}
            break
        case GET_CAT_LIST:
            return {...state, catListData}
            break

        default:
            return state
    }
}