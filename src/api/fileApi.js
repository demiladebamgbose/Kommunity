/**
 * Created by jolaadeadewale on 27/07/2017.
 */
let url = 'http://localhost:5151/';

class FileAPi {

    userFile = (userId) => {
        return new Promise((resolve, reject)=> {
            return fetch(url ,{
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