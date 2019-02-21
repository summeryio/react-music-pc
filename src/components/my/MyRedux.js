import axios from 'axios'
import {URL_HEADER, HTTP_SUCCESS_CODE} from 'common/js/constant'

let initialState = {
    subcount: {},
    playlist: [],
    playDetailData: {}
}


const GET_SUB_COUNT = 'music/MyRedux/GET_SUB_COUNT'
const GET_PLATLIST = 'music/MyRedux/GET_PLATLIST'
const GET_PLAY_DETAIL = 'music/MyRedux/GET_PLAY_DETAIL'


export const getSubCount = () => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/user/subcount`).then((res) => {
        console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_SUB_COUNT,
                subcount: res.data
            })
        }
    }).catch(error => {
        console.log(error);
    })
}

export const getPlaylist = (id) => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/user/playlist?uid=${id}`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_PLATLIST,
                playlist: res.data.playlist
            })
        }
    }).catch(error => {
        console.log(error);
    })
}

export const getPlayListData = (id) => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/playlist/detail?id=${id}`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_PLAY_DETAIL,
                playDetailData: res.data.playlist
            })
        }
    }).catch(error => {
        console.log(error);
    })
}


export default function my(state = initialState, action) {
    let {
        type,
        subcount,
        playlist,
        playDetailData
    } = action

    switch (type) {
        case GET_SUB_COUNT:
            return {...state, subcount}
            break
        case GET_PLATLIST:
            return {...state, playlist}
            break
        case GET_PLAY_DETAIL:
            return {...state, playDetailData}
            break

        default:
            return state
    }
}