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

export function fetchAllFiles() {
    return dispatch => {
        return FileApi.recentFile().then(data => {
            dispatch(fetchRecentFileSuccess(data))
        }).catch( err => {
            throw(err);
        })
    }
}