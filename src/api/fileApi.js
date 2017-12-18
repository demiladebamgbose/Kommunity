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

    previouslyLiked = (fileId, old) => {
        return new Promise((resolve, reject)=> {

            let index = old.indexOf(fileId);
            if(index === -1){
                const array = [...old, fileId];
                resolve(Object.assign([], array));
            }else{
                resolve(Object.assign([], old));
            }
        });
    };

    likeUserFile = (user, fileId, old) => {
        return new Promise((resolve, reject)=> {
            return fetch(url + `api/v1/like/${fileId}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({user: user})
            }).then((response)=> response.json()).then((responseJson) => {

                if(responseJson.message.data === 'success') {
                    resolve(Object.assign([], old, [fileId]));
                }else{

                }
            })
        })
    };

    unLikeUserFile = (user, fileId, old) => {
        debugger;
        return new Promise((resolve, reject)=> {
            return fetch(url + 'api/v1/like/' + fileId, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({user: user})
            }).then((response)=> response.json()).then((responseJson) => {

                if(responseJson.message.data === 'success') {
                    const array = old.filter((data) =>  data != fileId)
                    resolve(Object.assign([], array))
                }else{

                }
            })
        })
    };

    resetFile = (present, old) => {
        return new Promise((resolve, reject) => {
            let newArray = old.filter(data => {
                debugger;
                return data != present;
            });
          Object.assign({}, {likes: newArray});
        })
    };

    userLikedFiles = (fileId) => {
        return new Promise((resolve, reject)=> {
           return fetch(url + 'api/v1/likes?id=' + fileId, {
               method: 'GET',
               headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
               }
           }).then((response)=> response.json()).then((responseJson) => {

               if(responseJson.message.data === 'success') {
                    resolve(Object.assign([], responseJson.message.file.likes))
               }
           })
        })
    };

    deleteFile = (fileId, old) => {
        return new Promise((resolve, reject)=> {
            return fetch(url + 'api/v1/file/' + fileId, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((response)=> response.json()).then((responseJson) => {

                if(responseJson.message.data === 'success') {
                    const array = old.filter((data) =>  data != fileId);
                    resolve(Object.assign([], array))
                }else{

                }
            })
        })
    };

}

export default new FileAPi();