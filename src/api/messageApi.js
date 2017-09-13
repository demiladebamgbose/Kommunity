/**
 * Created by jolaadeadewale on 11/09/2017.
 */

class MessageApi {

    newMessage = (message) => {
        return new Promise((resolve, reject)=> {
            resolve(Object.assign({}, message));
        })
    }
}

export default new MessageApi();