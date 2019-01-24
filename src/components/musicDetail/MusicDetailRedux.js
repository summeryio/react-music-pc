import axios from 'axios'
import {URL_HEADER, HTTP_SUCCESS_CODE} from 'common/js/constant'

let initialState = {
    playDetailData: {},
    songDetailData: {},
    lyric: '',
    albumDetailData: {},
    mvDetailData: {},
    mvUrl: ''
}


const GET_PLAY_DETAIL = 'music/TopListRedux/GET_PLAY_DETAIL'
const GET_SONG_DETAIL = 'music/TopListRedux/GET_SONG_DETAIL'
const GET_LYRIC = 'music/TopListRedux/GET_LYRIC'
const GET_ALBUM = 'music/TopListRedux/GET_ALBUM'
const GET_MV = 'music/TopListRedux/GET_MV'
const GET_MV_URL = 'music/TopListRedux/GET_MV_URL'


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
            let lyricArr = !res.data.nolyric ? res.data.lrc.lyric.split('\n') : []
            let lyricResult = []

            lyricArr.forEach(function(val, index) {
                let cur = val.match(/\[(.+)\](.+)?/)

                if (cur && cur[2] && typeof cur[2] == 'string') {
                    lyricResult.push(cur[2])
                } else {
                    lyricResult.push([])
                }
            })
            
            dispatch({
                type: GET_LYRIC,
                lyric: !res.data.nolyric ? lyricResult.join('<br />') : ''
            })
        }
    }).catch(error => {
        console.log(error);
    })
}

export const getAlbumDetail = (id) => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/album?id=${id}`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_ALBUM,
                albumDetailData: res.data
            })
        }
    }).catch(error => {
        console.log(error);
    })
}

export const getMVDetail = (id) => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/mv/detail?mvid=${id}`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_MV,
                mvDetailData: res.data
            })
        }
    }).catch(error => {
        console.log(error);
    })
}

export const getMVUrl = (id) => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/mv/url?id=${id}`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_MV_URL,
                mvUrl: res.data.data.url
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
        lyric,
        albumDetailData,
        mvDetailData,
        mvUrl
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
        case GET_ALBUM:
            return {...state, albumDetailData}
            break
        case GET_MV:
            return {...state, mvDetailData}
            break
        case GET_MV_URL:
            return {...state, mvUrl}
            break

        default:
            return state
    }
}