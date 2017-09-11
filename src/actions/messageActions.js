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

export function newMessage(msg) {
    return dispatch => {
        MessageApi.newMessage(msg).then(data => {
            dispatch(newMessageSuccess(data));
        })
    }
}

export function screenShowing(status) {
    return dispatch => {
        dispatch(screenShowingSuccess(status))
    }
}