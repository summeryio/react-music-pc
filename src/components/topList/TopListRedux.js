import axios from 'axios'
import {URL_HEADER, HTTP_SUCCESS_CODE} from 'common/js/constant'

let initialState = {
    tagList: [],
    playList: [],
    playListLoaded: false,
    updateFrequency: ''
}

const GET_TOP_LIST_TAG = 'music/TopListRedux/GET_TOP_LIST_TAG'
const CHANGE_TAG = 'music/TopListRedux/CHANGE_TAG'
const GET_PLAY_LIST_DATA = 'music/TopListRedux/GET_PLAY_LIST_DATA'


export const getTopListTag = (id) => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/toplist`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_TOP_LIST_TAG,
                tagList: res.data.list,
                updateFrequency: res.data.list[0].updateFrequency
            })

            dispatch(getPlayListData(id))
        }
    }).catch(error => {
        console.log(error);
    })
}

export const changeTag = (id, updateFrequency) => (dispatch, getState) => {
    dispatch({
        type: CHANGE_TAG,
        updateFrequency,
        playListLoaded: false
    })
    dispatch(getPlayListData(id))
}

export const getPlayListData = (id) => (dispatch, getState) => {
    // let {updateFrequency} = getState().topList

    axios.get(`${URL_HEADER}/playlist/detail?id=${id}`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_PLAY_LIST_DATA,
                playList: res.data.playlist,
                playListLoaded: true
            })
        }
    }).catch(error => {
        console.log(error);
    })
}


export default function topList(state = initialState, action) {
    let {
        type,
        tagList,
        playList,
        playListLoaded,
        updateFrequency
    } = action

    switch (type) {
        case GET_TOP_LIST_TAG:
            return {...state, tagList, updateFrequency}
            break
        case CHANGE_TAG:
            return {...state, updateFrequency, playListLoaded}
            break
        case GET_PLAY_LIST_DATA:
            return {...state, playList, playListLoaded}
            break

        default:
            return state
    }
}