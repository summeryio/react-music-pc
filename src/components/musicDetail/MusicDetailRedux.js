import axios from 'axios'
import {URL_HEADER, HTTP_SUCCESS_CODE} from 'common/js/constant'

let initialState = {
    playDetailData: {},
    songDetailData: {},
    lyric: ''
}


const GET_PLAY_DETAIL = 'music/TopListRedux/GET_PLAY_DETAIL'
const GET_SONG_DETAIL = 'music/TopListRedux/GET_SONG_DETAIL'
const GET_LYRIC = 'music/TopListRedux/GET_LYRIC'


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

export const getSongDetail = (id) => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/song/detail?ids=${id}`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_SONG_DETAIL,
                songDetailData: res.data.songs[0]
            })
        }
    }).catch(error => {
        console.log(error);
    })
}

export const getLyric = (id) => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/lyric?id=${id}`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_LYRIC,
                lyric: res.data.lrc.lyric
            })
        }
    }).catch(error => {
        console.log(error);
    })
}


export default function musicDetail(state = initialState, action) {
    let {
        type,
        playDetailData,
        songDetailData,
        lyric
    } = action

    switch (type) {
        case GET_PLAY_DETAIL:
            return {...state, playDetailData}
            break
        case GET_SONG_DETAIL:
            return {...state, songDetailData}
            break
        case GET_LYRIC:
            return {...state, lyric}
            break

        default:
            return state
    }
}