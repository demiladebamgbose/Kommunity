/**
 * Created by jolaadeadewale on 23/07/2017.
 */

import * as types from './actionTypes';
import UserApi from '../api/userApi';

export function createUserSuccess(user) {
    return {type: types.CREATE_USER, user};
}

export function logUserInSuccess(user) {
    return {type: types.LOG_IN_USER, user};
}

export function createUser(user) {
    return dispatch => {
        return UserApi.createUser(user).then(user => {
            dispatch(createUserSuccess(user));
        }).catch(err => {
            throw(err);
        })
    }
}

export function logUserIn(user) {
    return dispatch => {
        return UserApi.logUserIn(user).then(user => {
            dispatch(logUserInSuccess(user))
        }).catch(err=> {
            throw(err);
        })
    }
}
