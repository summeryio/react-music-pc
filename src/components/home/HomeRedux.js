import axios from 'axios'
import {URL_HEADER, HTTP_SUCCESS_CODE} from 'common/js/constant'

let initialState = {
    bannerData: [],
    playListTag: [],
    playListData: [],
    recommendData: [],
    albumData: [],
    rankData: [],
    userInfo: {},
    singerData: []
}

const GET_BANNER = 'music/HomeRedux/GET_BANNER'
const GET_PLAY_LIST_TAG = 'music/HomeRedux/GET_PLAY_LIST_TAG'
const GET_PLAY_LIST = 'music/HomeRedux/GET_PLAY_LIST'
const GET_RECOMMEND = 'music/HomeRedux/GET_RECOMMEND'
const GET_ALBUM = 'music/HomeRedux/GET_ALBUM'
const GET_RANK = 'music/HomeRedux/GET_RANK'
const GET_USER_INFO = 'music/HomeRedux/GET_USER_INFO'
const GET_SINGER = 'music/HomeRedux/GET_SINGER'


export const getBanner = () => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/banner`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            res.data.banners = res.data.banners.filter(banner => {
                let type = parseInt(banner.targetType)
                
                if (type === 3000 || type === 1005) {
                    return false
                }

                return true
            })

            dispatch({
                type: GET_BANNER,
                bannerData: res.data.banners
            })
        }
    }).catch(error => {
        console.log(error);
    })
}

export const getPlayListTag = () => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/playlist/hot`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_PLAY_LIST_TAG,
                playListTag: res.data.tags
            })
        }
    }).catch(error => {
        console.log(error);
    })
}

export const getPlayList = () => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/personalized?limit=8`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_PLAY_LIST,
                playListData: res.data.result
            })
        }
    }).catch(error => {
        console.log(error);
    })
}

export const getRecommend = () => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/recommend/resource`, {withCredentials: true}).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_RECOMMEND,
                recommendData: res.data.recommend.slice(0, 3)
            })
        }
    }).catch(error => {
        console.log(error);
    })
}

export const getAlbum = () => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/top/album?offset=0&limit=10`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_ALBUM,
                albumData: res.data.albums
            })
        }
    }).catch(error => {
        console.log(error);
    })
}

export const getRank = () => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/toplist/detail`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            res.data.list.slice(0, 3).forEach((item, i) => {
                dispatch(getRankList(i, item.id))
            })
        }
    }).catch(error => {
        console.log(error);
    })
}
export const getRankList = (i, rankId) => (dispatch, getState) => {
    let {rankData} = getState().home
    
    axios.get(`${URL_HEADER}/playlist/detail?id=${rankId}`, {withCredentials: true}).then((res) => {
        if (res.status === HTTP_SUCCESS_CODE) {
            let {playlist} = res.data
            
            rankData[i] = {
                id: playlist.id,
                name: playlist.name,
                coverImgUrl: playlist.coverImgUrl,
                tracks: playlist.tracks.slice(0, 10)
            }
            
            dispatch({
                type: GET_RANK,
                rankData
            })
        }
    }).catch(error => {
        console.log(error);
    })
}

export const getUserInfo = (userId) => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/user/detail?uid=${userId}&timestamp=${new Date().getTime()}`, {withCredentials: true}).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            let {userId, avatarUrl, nickname, followeds, follows, eventCount} = res.data.profile
            let {level} = res.data
            
            dispatch({
                type: GET_USER_INFO,
                userInfo: {userId, avatarUrl, nickname, followeds, follows, eventCount, level}
            })
        }
    }).catch(error => {
        console.log(error);
    })
}

export const getSinger = () => (dispatch, getState) => {
    axios.get(`${URL_HEADER}/artist/list?cat=5001&limit=5`).then((res) => {
        // console.log(res);

        if (res.status === HTTP_SUCCESS_CODE) {
            dispatch({
                type: GET_SINGER,
                singerData: res.data.artists
            })
        }
    }).catch(error => {
        console.log(error);
    })
}

export default function home(state = initialState, action) {
    let {
        type,
        bannerData,
        playListTag,
        playListData,
        recommendData,
        albumData,
        rankData,
        userInfo,
        singerData
    } = action

    switch (type) {
        case GET_BANNER:
            return {...state, bannerData}
            break
        case GET_PLAY_LIST_TAG:
            return {...state, playListTag}
            break
        case GET_PLAY_LIST:
            return {...state, playListData}
            break
        case GET_RECOMMEND:
            return {...state, recommendData}
            break
        case GET_ALBUM:
            return {...state, albumData}
            break
        case GET_RANK:
            return {...state, rankData}
            break
        case GET_USER_INFO:
            return {...state, userInfo}
            break
        case GET_SINGER:
            return {...state, singerData}
            break

        default:
            return state
    }
}