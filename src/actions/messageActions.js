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

export function getMessagesSuccess(data) {
    return {
        type: types.PREVIOUS_MESSAGES, data
    }
}

export function getPreviousConversationSucess(data) {
    return {
        type: types.USER_CONVERSATION_MESSAGE, data
    }
}

export function getConversationListSuccess(data) {
    return {
        type: types.GET_CONVERSATION_LIST, data
    }
}

export function sendReplySuccess(data) {
    return {
        type: types.SEND_CONVERSATION_REPLY, data
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
            resolve(dispatch(currentUserSuccess(user)))
        });
    }
}

export function previousMessages(user) {
    return dispatch => {
        return MessageApi.retrieveMessages(user).then( data => {
            dispatch(getMessagesSuccess(data))
        })
    }
}

export function previousConversations(user) {
    return dispatch => {
        return MessageApi.previousConversation(user).then( data => {
            dispatch(getPreviousConversationSucess(data))
        })
    }
}

export function getConversationList(user) {
    return dispatch => {
        return MessageApi.getConversationList(user).then(data => {
            dispatch(getConversationListSuccess(data))
        })
    }
}

export function sendReply(user) {
    return dispatch => {
        return MessageApi.sendConversationReply(user).then(data => {
            dispatch(sendReplySuccess(data))
        })
    }
}