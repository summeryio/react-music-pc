import axios from 'axios'
import {URL_HEADER, HTTP_SUCCESS_CODE} from 'common/js/constant'

let initialState = {
    albumData: {}
}

const GET_ALBUM_DATA = 'music/TopListRedux/GET_ALBUM_DATA'

export const getAlbumData = (page) => (dispatch, getState) => {
    console.log(page);
    axios.get(`${URL_HEADER}/top/album?offset=${(page - 1) * 35}&limit=35`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_ALBUM_DATA,
                albumData: res.data
            })
        }
    }).catch(error => {
        console.log(error);
    })
}


export default function album(state = initialState, action) {
    let {
        type,
        albumData
    } = action

    switch (type) {
        case GET_ALBUM_DATA:
            return {...state, albumData}
            break

        default:
            return state
    }
}