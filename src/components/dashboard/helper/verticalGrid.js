/**
 * Created by jolaadeadewale on 29/07/2017.
 */
import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
let {height, width} = Dimensions.get('window');
import Moment from 'react-moment';

const VerticalGrid = ({obj, click, like, uid, userLike, options}) => {
   /* let data1 = {};
    if(obj['0'].content.secure_url) {
      //  data1 = obj['0'].content.secure_url.split('upload/');
      //  data1 = data1.join('upload/c_scale,h_300,w_300/');
    }else{
        data1 = '';
    } */

    return (
        <View key={obj['0'].content} style={{flex: 1, flexDirection: 'row', marginBottom: 15}}>
            <View style={{flex: 0, flexDirection: 'column', margin: 1}}>

                <View style={{flex: 0, flexDirection: 'row', margin: 1, justifyContent:
                    'space-between', paddingLeft: 10, paddingRight: 10, alignContent: 'center'}}
                 >
                    <Circle url="https://res.cloudinary.com/dd58mfinr/image/upload/v1481734664/default.png"
                        label="jols" clicked={click}
                    />
                    <TouchableOpacity onPress={()=> options()}>
                        <Ionicons name="ios-more-outline" size={20} />
                    </TouchableOpacity>

                </View>

                <TouchableOpacity onPress={() => click(obj['0']._id)}>
                    <View style={{width: width, height: ((55/ 100) * height), backgroundColor: 'white',  margin: 1}} >
                        <Image  style={{width: width, height: ((55/ 100) * height)}} source={{ uri: obj['0'].link
                        ||
                        obj['0'].content.secure_url} }  />
                    </View>
                </TouchableOpacity>
                { (! obj['0'].link) ? <View style={{flex: 1, flexDirection: 'column',  paddingLeft: 10, marginTop: 8}}>


                    <TouchableOpacity onPress={()=>{like(obj['0']._id, (obj[0].likes.indexOf(uid) >= 0))}}>

                        <Ionicons name="ios-heart-outline"  size={20} color={
                            (obj[0].likes.indexOf(uid) >= 0) ? 'red': 'black'
                        } />
                    </TouchableOpacity>
                    <Text onPress={()=> userLike(obj['0']._id)} style={styles.commentText}>{obj[0].likes.length} Likes</Text>
                    <Moment
                        style={styles.commentText} element={Text} fromNow>{obj[0].timestamp}
                    </Moment>
                </View> : null}
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
    },
    commentText:{
        color: 'grey',
        marginTop: 10,
        fontSize: 10
    }
});

export default VerticalGrid;