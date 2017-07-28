/**
 * Created by jolaadeadewale on 27/07/2017.
 */
import React from 'react';
import {View, Image, TouchableHighlight} from 'react-native';

const Grid = ({obj, click}) => {
    let data = obj['0'].content.secure_url.split('upload/');
    obj['0'].content.secure_url = data.join('upload/c_scale,h_100,w_100/');

    if(!obj['1']) {
        obj['1'] = {'content': {'secure_url': ''}}
    } else{
        let data = obj['1'].content.secure_url.split('upload/');
        obj['1'].content.secure_url = data.join('upload/c_scale,h_100,w_100/');

    }

    if(!obj['2']) {
        obj['2'] = {'content': {'secure_url': ''}};
    } else{
        let data = obj['2'].content.secure_url.split('upload/');
        obj['2'].content.secure_url = data.join('upload/c_scale,h_100,w_100/');
    }

    return (
        <View key={obj['0'].content} style={{flex: 1, flexDirection: 'row', margin: 1}}>
            <TouchableHighlight onPress={() => click(obj['0']._id)}>
                <View style={{width: 100, height: 100, backgroundColor: 'white',  margin: 1}} >
                    <Image  style={{width: 99, height: 99}} source={{ uri: obj['0'].content.secure_url} }  />
                </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => click(obj['1']._id)}>
                <View style={{width: 100, height: 100, backgroundColor: 'white',  margin: 1}} >
                    <Image  style={{width: 99, height: 99}}  source={{ uri: obj['1'].content.secure_url} } />
                </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => click(obj['2']._id)}>
                <View style={{width: 100, height: 100, backgroundColor: 'white',  margin: 1}} >
                    <Image style={{width: 99, height: 99}}  source={{ uri: obj['2'].content.secure_url} } />
                </View>
            </TouchableHighlight>
        </View>
    )
};

export default Grid;