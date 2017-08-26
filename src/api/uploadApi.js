/**
 * Created by jolaadeadewale on 24/07/2017.
 */
import {Constants} from 'expo';
let  url = Constants.manifest.infoPlist.url
//let  url = 'https://kommunity-2-2-2.herokuapp.com/';

class UploadApi {

    uploadCameraImage = (image) => {
        return new Promise((resolve, reject)=> {
            resolve(Object.assign({}, image));
        });
    };

    uploadAddCategory = (obj, old) => {
        return new Promise((resolve, reject)=> {
            resolve(Object.assign({}, old, obj))
        })
    };

    uploadFileCloud = (obj) => {
        let data = new FormData();
        data.append("file", {uri: obj.uri.uri, name: obj.uri.filename});
        data.append("upload_preset", obj.preset );

        return new Promise((resolve, reject)=> {
            return fetch(obj.url ,{
                    method: 'POST',
                    body: data
                 })
                .then((response) => response.json())
                .then((responseJson) => {
                    resolve(Object.assign({}, responseJson));
                });
        });
    };

    uploadFileToServer = (obj) => {
        return new Promise((resolve, reject)=> {
            return fetch(url + 'api/v1/upload' ,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj)
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    resolve(Object.assign({}, responseJson));
                });
        });
    };

}

export default new UploadApi();