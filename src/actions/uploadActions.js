/**
 * Created by jolaadeadewale on 24/07/2017.
 */
import * as types from './actionTypes';
import UploadApi from '../api/uploadApi';

export function uploadCameraImageSuccess(image) {
    return {type: types.UPLOAD_IMAGE_CAMERA, image};
}

export function uploadFileToCloudSuccess(data) {
    return {type: types.UPLOAD_FILE_CLOUD, data};
}

export function saveUploadToServerSuccess(data) {
    return {type: types.SAVE_UPLOAD_SERVER, data};
}

export function uploadCategorySuccess(data){
    return {type: types.ADD_UPLOAD_CATEGORY, data}
}

export function uploadCameraImage(image) {
    return dispatch => {
        return UploadApi.uploadCameraImage(image).then( file => {
            dispatch(uploadCameraImageSuccess(file));
        }).catch(err=> {
            throw(err);
        })
    }
}

export function addCategory(obj, old){
    return dispatch => {
        return UploadApi.uploadAddCategory(obj, old).then( data=> {
            dispatch(uploadCategorySuccess(data))
        }).catch(err=> {
            throw(err);
        })
    }
}

export function uploadFileCloud(obj) {
    return dispatch => {
        return UploadApi.uploadFileCloud(obj).then (data => {
            dispatch(uploadFileToCloudSuccess(data));
        }).catch( err=> {
            throw(err);
        })
    }
}

export function uploadFileToServer(obj) {
    return dispatch => {
        return UploadApi.uploadFileToServer(obj).then( data => {
            dispatch(saveUploadToServerSuccess(data));
        }).catch( err=> {
            throw(err);
        })
    }
}