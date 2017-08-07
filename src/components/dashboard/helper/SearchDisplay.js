/**
 * Created by jolaadeadewale on 05/08/2017.
 */
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';


const Circle = ({label}) => {
    return (
        <View style={stylesCircle.center}>
            <View style={stylesCircle.circle}>

            </View>
            <Text style={stylesCircle.text}>{label}</Text>
        </View>
    )
};

const stylesCircle = StyleSheet.create({
    circle: {
        width: 40,
        height: 40,
        borderRadius: 40/2,
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


const SearchDisplay = ({img, name, other}) => {

    return (
        <View style={styles.container}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Circle/>
                <View style={{height: 44}}>
                    <Text style={{fontSize: 11, marginBottom: 1}}>{name}</Text>
                    <Text style={{fontSize: 11}}>{other.firstName} {other.lastName}</Text>
                </View>

            </View>
        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        margin: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        padding: 10,

    }
});

export default SearchDisplay;