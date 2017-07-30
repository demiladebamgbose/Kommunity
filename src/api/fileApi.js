/**
 * Created by jolaadeadewale on 27/07/2017.
 */
let url = 'https://kommunity-2-2-2.herokuapp.com/';

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

}

export default new FileAPi();