/**
 * Created by jolaadeadewale on 27/07/2017.
 */

import * as Types from './actionTypes';
import FileApi from '../api/fileApi';

export function fetchUserFileSuccess(files){
    return {type: Types.FETCH_USER_FILES, files}
}

export function fetchRecentFileSuccess(files){
    return {type: Types.FETCH_RECENT_FILES, files}
}

export function fetchSingleFileViewSuccess(viewFile) {
    return {type: Types.FETCH_SINGLE_FILE_VIEW, viewFile}
}

export function fetchLikesSuccess(data) {
    return {type: Types.LIKE_USER_FILE, data}
}

export function fetchunLikeSuccess(data) {
    return {type: Types.UNLIKE_USER_FILE, data};
}

export function fetchAllFiles() {
    return dispatch => {
        return FileApi.recentFile().then(data => {
            dispatch(fetchRecentFileSuccess(data));
        }).catch( err => {
            throw(err);
        })
    }
}

export function fetchSingleFileView (file) {
    return dispatch => {
        return FileApi.singleFileView(file).then(data => {
            dispatch(fetchSingleFileViewSuccess(data));
        }).catch(err=> {
            throw(err);
        })
    }
}

export function fetchUserFiles(userId) {
    return dispatch => {
        return FileApi.userFile(userId).then( data => {
            dispatch(fetchUserFileSuccess(data));
        }).catch( err => {
            throw(err)
        })
    }
}

export function likeFile(user, fileId, old) {
    return dispatch => {
        return FileApi.likeUserFile(user, fileId, old).then( data => {
            dispatch(fetchLikesSuccess(data));
        }).catch(err => {
            throw (err);
        })
    }
}

export function unLikeFile(user, fileId, old) {
    return dispatch => {
        return FileApi.unLikeUserFile(user, fileId, old).then( data => {
            dispatch(fetchunLikeSuccess(data));
        }).catch(err => {
            throw(err);
        })
    }
}