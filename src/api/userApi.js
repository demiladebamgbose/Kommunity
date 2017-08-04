/**
 * Created by jolaadeadewale on 23/07/2017.
 */
let  url = 'http://localhost:5151/';
// let  url = 'https://kommunity-2-2-2.herokuapp.com/';

class UserApi {

    createUser = (user)=> {
        return new Promise((resolve, reject)=> {
            return fetch(url + 'api/v1/users' ,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    resolve(Object.assign({}, responseJson));
                });
        });
    };

    logUserIn =(user)=> {
        return new Promise((resolve, reject)=> {

            return fetch(url + 'api/v1/users/login' ,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    resolve(Object.assign({}, responseJson));
                });
        });
    }
}

export default new UserApi();