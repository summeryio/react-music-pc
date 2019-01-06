import axios from 'axios'
import {URL_HEADER, HTTP_SUCCESS_CODE} from 'common/js/constant'

let initialState = {
    tagList: [],
    tagID: null,
    playList: [],
    playListLoaded: false,
    updateFrequency: ''
}

const GET_TOP_LIST_TAG = 'music/TopListRedux/GET_TOP_LIST_TAG'
const CHANGE_TAG = 'music/TopListRedux/CHANGE_TAG'
const GET_TOP_LIST_DATA = 'music/TopListRedux/GET_TOP_LIST_DATA'


export const getTopListTag = () => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/toplist`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_TOP_LIST_TAG,
                tagList: res.data.list,
                tagID: res.data.list[0].id,
                updateFrequency: res.data.list[0].updateFrequency
            })

            dispatch(getTopListData())
        }
    }).catch(error => {
        console.log(error);
    })
}

export const changeTag = (id, updateFrequency) => (dispatch, getState) => {
    dispatch({
        type: CHANGE_TAG,
        tagID: id,
        updateFrequency,
        playListLoaded: false
    })
    dispatch(getTopListData())
}

export const getTopListData = () => (dispatch, getState) => {
    let {tagID, updateFrequency} = getState().topList
    
    axios.get(`${URL_HEADER}/playlist/detail?id=${tagID}`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_TOP_LIST_DATA,
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
        tagID,
        playList,
        playListLoaded,
        updateFrequency
    } = action

    switch (type) {
        case GET_TOP_LIST_TAG:
            return {...state, tagList, tagID, updateFrequency}
            break
        case CHANGE_TAG:
            return {...state, tagID, updateFrequency, playListLoaded}
            break
        case GET_TOP_LIST_DATA:
            return {...state, playList, playListLoaded}
            break

        default:
            return state
    }
}