/**
 * Created by jolaadeadewale on 11/09/2017.
 */
import * as types from './actionTypes';
import MessageApi from '../api/messageApi';

export function newMessageSuccess(data) {
    return {
        type: types.NEW_USER_MESSAGE, data
    }
}

export function screenShowingSuccess(data) {
    return {
        type: types.MESSAGE_SCREEN_SHOWING, data
    }
}

export function currentUserSuccess(data) {
    return {
        type: types.CURRENT_MESSAE_USER, data
    }
}

export function sendNewMessage(msg) {
    return dispatch => {
        return MessageApi.newMessage(msg).then(data => {
            dispatch(newMessageSuccess(data));
        })
    }
}

export function screenShowing(status) {
    return dispatch => {
        return new Promise((resolve, reject)=> {
            resolve(dispatch(screenShowingSuccess(Object.assign({},status))))
        });
    }
}

export function currentUser(user) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            resolve(dispatch(currentUserSuccess(Object.assign([],user))))
        });
    }
}