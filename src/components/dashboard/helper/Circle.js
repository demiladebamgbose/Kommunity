/**
 * Created by jolaadeadewale on 04/08/2017.
 */
import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';

const Circle = ({label, url, click}) => {
    return (
        <View style={styles.center}>
            <TouchableOpacity onPress={() => click(label)}>
                <View style={styles.circle}>
                    <Image  style={{width: 70, height: 70, borderRadius: 70/2,}}
                            source={{ uri: url} } />
                </View>
            </TouchableOpacity>
            <Text style={styles.text}>{label}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    circle: {
        width: 70,
        height: 70,
        borderRadius: 70/2,
        backgroundColor: '#D3D3D3',
        marginRight: 6
    },
    center: {
        alignContent: 'center',
        alignItems: 'center'
    },
    text: {
        marginTop: 2,
        fontSize: 8,
    }
});

export default Circle;
