/**
 * Created by jolaadeadewale on 27/07/2017.
 */
import {Constants} from 'expo';
let  url = Constants.manifest.infoPlist.url;
//let url = 'https://kommunity-2-2-2.herokuapp.com/';
// // "url": "http://localhost:5151/"

class FileAPi {

    userFile = (userId) => {
        return new Promise((resolve, reject)=> {
            return fetch(url + 'api/v1/upload/user/' + userId,{
                method: 'GET'
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    resolve(Object.assign({}, responseJson));
                });
        })
    };

    recentFile = () => {
        return new Promise((resolve, reject)=> {
            return fetch(url + 'api/v1/upload' ,{
                method: 'GET'
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    resolve(Object.assign({}, responseJson));
                });
        })
    };

    singleFileView = (file) => {
        return new Promise((resolve, reject) => {
            resolve(Object.assign({}, file));
        })
    };

    likeUserFile = (user, fileId, old) => {
        return new Promise((resolve, reject)=> {
            return fetch(url + 'api/v1/like/' + fileId, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            }).then((response)=> response.json()).then((responseJson) => {

                if(responseJson.message.data === 'success') {
                    resolve(Object.assign({}, old, [fileId]));
                }else{

                }
            })
        })
    };

    unLikeUserFile = (user, fileId, old) => {
        return new Promise((resolve, reject)=> {
            return fetch(url + 'api/v1/like/' + fileId, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            }).then((response)=> response.json()).then((responseJson) => {

                if(responseJson.message.data === 'success') {
                     let array = old;
                     let index = array.indexOf(fileId);
                     array = array.splice(index, 1);
                     resolve(Object.assign({}, old, array));
                }else{

                }
            })
        })
    }

}

export default new FileAPi();