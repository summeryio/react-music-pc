import axios from 'axios'
import {URL_HEADER, HTTP_SUCCESS_CODE} from 'common/js/constant'

let initialState = {
    userInfo: {},
    playlist: []
}

const GET_USER_INFO = 'music/UserRedux/GET_USER_INFO'
const GET_PLSY_LIST = 'music/UserRedux/GET_PLSY_LIST'

export const getUserInfo = (id) => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/user/detail?uid=${id}`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_USER_INFO,
                userInfo: res.data
            })
        }
    }).catch(error => {
        console.log(error);
    })
}

export const getPlayList = (id) => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/user/playlist?uid=${id}`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_PLSY_LIST,
                playlist: res.data.playlist
            })
        }
    }).catch(error => {
        console.log(error);
    })
}


export default function user(state = initialState, action) {
    let {
        type,
        userInfo,
        playlist
    } = action

    switch (type) {
        case GET_USER_INFO:
            return {...state, userInfo}
            break
        case GET_PLSY_LIST:
            return {...state, playlist}
            break

        default:
            return state
    }
}