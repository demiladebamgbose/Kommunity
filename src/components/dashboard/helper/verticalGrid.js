/**
 * Created by jolaadeadewale on 29/07/2017.
 */
import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
let {height, width} = Dimensions.get('window');

const VerticalGrid = ({obj, click}) => {
    let data1 = {};
    if(obj['0'].content.secure_url) {
      //  data1 = obj['0'].content.secure_url.split('upload/');
      //  data1 = data1.join('upload/c_scale,h_300,w_300/');
    }else{
        data1 = '';
    }


    return (
        <View key={obj['0'].content} style={{flex: 1, flexDirection: 'row', margin: 1}}>
            <View style={{flex: 1, flexDirection: 'column', margin: 1}}>

                <View style={{flex: 0, flexDirection: 'row', margin: 1, justifyContent:
                    'space-between', paddingLeft: 10, paddingRight: 10, alignContent: 'center'}}
                 >
                    <Circle url="https://res.cloudinary.com/dd58mfinr/image/upload/v1481734664/default.png"
                        label="jols" clicked={click}
                    />

                   <Ionicons name="ios-more-outline" size={20} />
                </View>

                <TouchableOpacity onPress={() => click(obj['0']._id)}>
                    <View style={{width: width, height: ((55/ 100) * height), backgroundColor: 'white',  margin: 1}} >
                        <Image  style={{width: width, height: ((55/ 100) * height)}} source={{ uri: obj['0'].content.secure_url} }  />
                    </View>
                </TouchableOpacity>
                <View style={{flex: 1, flexDirection: 'row', borderBottomWidth: 1}}>
                    <Image style={{width: 20, height: 20}} source={require('../../../images/likee.png')}/>
                    <Image style={{width: 20, height: 20}} source={require('../../../images/chat.png')}/>

                </View>
            </View>
        </View>
    )
};

const Circle = ({label, url, clicked}) => {
    return (
        <View style={styles.center}>
            <TouchableOpacity onPress={() => clicked(label)}>
                <View style={styles.circle}>
                    <Image  style={{width: 25, height: 25, borderRadius: 25/2,}}
                            source={{ uri: url} } />
                </View>
            </TouchableOpacity>
        </View>
    )
};


const styles = StyleSheet.create({
    circle: {
        width: 50,
        height: 50,
        borderRadius: 50/2,
        marginRight: 6
    },
    center: {

    },
    text: {
        marginTop: 2,
        fontSize: 8,
    }
});

export default VerticalGrid;