/**
 * Created by jolaadeadewale on 04/08/2017.
 */
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Circle = ({label}) => {
    return (
        <View style={styles.center}>
        <View style={styles.circle}>

        </View>
            <Text style={styles.text}>{label}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    circle: {
        width: 70,
        height: 70,
        borderRadius: 70/2,
        backgroundColor: 'red',
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
