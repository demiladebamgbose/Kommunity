/**
 * Created by jolaadeadewale on 27/07/2017.
 */

import * as Types from './actionTypes';
import FileApi from '../api/fileApi';

function fetchUserFileSuccess(files){
    return {type: Types.FETCH_USER_FILES, files}
}

function fetchRecentFileSuccess(files){
    return {type: Types.FETCH_RECENT_FILES, files}
}

function fetchSingleFileViewSuccess(viewFile) {
    return {type: Types.FETCH_SINGLE_FILE_VIEW, viewFile}
}

function fetchLikesSuccess(data) {
    return {type: Types.LIKE_USER_FILE, data}
}

function fetchunLikeSuccess(data) {
    return {type: Types.UNLIKE_USER_FILE, data};
}

function fetchPrevLikedSuccess(data) {
    return {type: Types.PREVIOUSLY_LIKED_FILE, data};
}

function fetchUserLikedFilesSuccess(users) {
    return {type: Types.USER_LIKED_FILES, users};
}

function deletFileSuccess(data) {
    return {type: Types.DELETE_FILE, data};
}

function resetLikedFilesSuccess(viewFile) {
    return {
        type: Types.RESET_LIKED_FILE,
        viewFile
    }
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

export function resetLikedFile(fileToDelete, oldData) {
    return dispatch => {
        return FileApi.resetFile(fileToDelete, oldData).then( data => {
            dispatch(resetLikedFilesSuccess(data))
        }).catch(err => {
            throw(err);
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

export function previouslyLiked(fileId, old) {
    return dispatch => {
        return FileApi.previouslyLiked(fileId, old).then( data => {
            dispatch(fetchPrevLikedSuccess(data));
        }).catch(err=> {
            throw(err);
        })
    }
}

export function userLikedFiles(fileId) {
    return dispatch => {
        return FileApi.userLikedFiles(fileId).then( users => {
            dispatch(fetchUserLikedFilesSuccess(users));
        }).catch(err=> {
            throw(err);
        })
    }
}

export function deleteFile(fileId, old) {
    return dispatch => {
        return FileApi.deleteFile(fileId, old).then( data => {
            dispatch(deletFileSuccess(data))
        }).catch(err => {
            throw(err);
        })
    }
}