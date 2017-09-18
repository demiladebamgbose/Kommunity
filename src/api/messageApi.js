/**
 * Created by jolaadeadewale on 11/09/2017.
 */
import {Constants} from 'expo';
let  url = Constants.manifest.infoPlist.url;

class MessageApi {

    newMessage = (message) => {
        return new Promise((resolve, reject)=> {
            resolve(Object.assign({}, message));
        })
    };

    retrieveMessages = (user) => {
        return new Promise((resolve, reject) => {
            return fetch(url + `api/v1/message/${user._id}`, {
                method: 'GET'
            }).then((response) => response.json())
                .then((responseJson) => {
                console.log('Came back as ', responseJson);
                    resolve(Object.assign([], responseJson.conversations));
                });
        })
    };

    previousConversation = (user) => {
        return new Promise((resolve, reject) => {
            return fetch(url + `api/v1/message/conversation/${user.conversationId}`, {
                method: 'GET'
            }).then((response) => response.json())
                .then((responseJson) => {
                    resolve(Object.assign([], responseJson.conversations));
                });
        })
    };

    getConversationList = (user) => {
        return new Promise((resolve, reject) => {
          return fetch(url + `api/v1/message/conversation/users/${user._id}`, {
              method: 'GET'
          })  .then((response) => response.json())
              .then((responseJson) => {
                  resolve(Object.assign([], responseJson.conversationList));
              });
        })
    };
}

export default new MessageApi();