/**
 * Created by jolaadeadewale on 29/07/2017.
 */
import React from 'react';
import {View, Image, Text, TouchableHighlight} from 'react-native';

const VerticalGrid = ({obj, click}) => {
    let data1 = obj['0'].content.secure_url.split('upload/');
    data1  = data1.join('upload/c_scale,h_300,w_300/');
    let data2, data3 = '';

    /*if(!obj['1']) {
        obj['1'] = {'content': {'secure_url': ''}}
    } else{
        data2 = obj['1'].content.secure_url.split('upload/');
        data2 = data2.join('upload/c_scale,h_100,w_100/');
    }

    if(!obj['2']) {
        obj['2'] = {'content': {'secure_url': ''}};
    } else{
        data3 = obj['2'].content.secure_url.split('upload/');
        data3 = data3.join('upload/c_scale,h_100,w_100/');
    } */

    return (
        <View key={obj['0'].content} style={{flex: 1, flexDirection: 'row', margin: 1}}>
            <View style={{flex: 1, flexDirection: 'column', margin: 1}}>

                <View style={{flex: 1, flexDirection: 'row', margin: 1, justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10}}>
                    <Image style={{width: 20, height: 20}}
                           source={{ uri: 'https://res.cloudinary.com/dd58mfinr/image/upload/c_scale,r_30,w_20/v1481734664/default.png'} }
                    />
                    <Text>Username</Text>
                    <Image  source={require('../../../images/more.png')} />
                </View>

                <TouchableHighlight onPress={() => click(obj['0']._id)}>
                    <View style={{width: 300, height: 300, backgroundColor: 'white',  margin: 1}} >
                        <Image  style={{width: 300, height: 300}} source={{ uri: data1} }  />
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    )
};

export default VerticalGrid;