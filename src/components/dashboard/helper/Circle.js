/**
 * Created by jolaadeadewale on 04/08/2017.
 */
import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
let {height, width} = Dimensions.get('window');


const Circle = ({label, url, click}) => {
  
    return (
        <View style={styles.center}>
            <TouchableOpacity onPress={() => click(label)}>
                <View style={styles.circle}>
                    <Image  style={{width: ((18.7 / 100) * width), height: ((18.7 / 100) * width), borderRadius: (((18.7 / 100) * width)/2) }}
                            source={{ uri: url} } />
                    <Text style={styles.text}>{label}</Text>
                </View>
            </TouchableOpacity>

        </View>
    )
};

const styles = StyleSheet.create({
    circle: {
        width: ((18.7 / 100) * width),
        height: ((18.7 / 100) * width),
        borderRadius: (((18.7 / 100) * width) / 2),
        marginRight: 10
    },
    center: {
        alignContent: 'center',
        alignItems: 'center'
    },
    text: {
        marginTop: 2,
        fontSize: 8,
        textAlign: 'center'
    }
});

export default Circle;
