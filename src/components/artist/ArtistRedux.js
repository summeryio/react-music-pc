import axios from 'axios'
import {URL_HEADER, HTTP_SUCCESS_CODE} from 'common/js/constant'

let initialState = {
    artistData: {},
    albumData: {},
    mvData: {},
    descData: {},
    simiArtist: {}
}

const GET_ARTIST_DATA = 'music/TopListRedux/GET_ARTIST_DATA'
const GET_ALBUM_DATA = 'music/TopListRedux/GET_ALBUM_DATA'
const GET_MV_DATA = 'music/TopListRedux/GET_MV_DATA'
const GET_DESC_DATA = 'music/TopListRedux/GET_DESC_DATA'
const GET_SIMI_ARTIST = 'music/TopListRedux/GET_SIMI_ARTIST'

export const getArtistData = (id) => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/artists?id=${id}`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_ARTIST_DATA,
                artistData: res.data
            })
        }
    }).catch(error => {
        console.log(error);
    })
}

export const getAlbumData = (id, page) => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/artist/album?id=${id}&limit=12&offset=${(page - 1) * 12}`).then((res) => {
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

export const getMVData = (id) => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/artist/mv?id=${id}`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_MV_DATA,
                mvData: res.data
            })
        }
    }).catch(error => {
        console.log(error);
    })
}

export const getDescData = (id) => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/artist/desc?id=${id}`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_DESC_DATA,
                descData: res.data
            })
        }
    }).catch(error => {
        console.log(error);
    })
}

export const getSimiArtist = (id) => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/simi/artist?id=${id}`, {withCredentials: true}).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_SIMI_ARTIST,
                simiArtist: res.data
            })
        }
    }).catch(error => {
        console.log(error);
    })
}



export default function artist(state = initialState, action) {
    let {
        type,
        artistData,
        albumData,
        mvData,
        descData,
        simiArtist
    } = action

    switch (type) {
        case GET_ARTIST_DATA:
            return {...state, artistData}
            break
        case GET_ALBUM_DATA:
            return {...state, albumData}
            break
        case GET_MV_DATA:
            return {...state, mvData}
            break
        case GET_DESC_DATA:
            return {...state, descData}
            break
        case GET_SIMI_ARTIST:
            return {...state, simiArtist}
            break

        default:
            return state
    }
}