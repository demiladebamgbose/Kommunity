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

export function fetchuserFile(userId) {

}

export function fetchSingleFileViewSuccess(viewFile) {
    return {type: Types.FETCH_SINGLE_FILE_VIEW, viewFile}
}

export function fetchAllFiles() {
    return dispatch => {
        return FileApi.recentFile().then(data => {
            dispatch(fetchRecentFileSuccess(data))
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