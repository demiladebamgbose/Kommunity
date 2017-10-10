/**
 * Created by jolaadeadewale on 08/10/2017.
 */
import {Constants} from 'expo';
let  url = Constants.manifest.infoPlist.url;

class EventApi {
    getEvents = () => {
        return new Promise((resolve, reject) => {
            return fetch(url + 'api/v1/events', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then((response)=> response.json()).then((responseJson) => {

                if(responseJson.file) {
                    resolve(Object.assign([], responseJson.file))
                }
            })
        })
    };

    getSponsors = () => {
        return new Promise((resolve, reject) => {
            return fetch(url + 'api/v1/sponsored', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then((response)=> response.json()).then((responseJson) => {

                if(responseJson.sponsored) {
                    resolve(Object.assign([], responseJson.sponsored))
                }
            })
        })
    };
}

export default new EventApi();