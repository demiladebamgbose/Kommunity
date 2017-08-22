/**
 * Created by jolaadeadewale on 21/08/2017.
 */
import React from 'react';
import {View, StyleSheet, Image, Text, Switch} from 'react-native';

const Category = ({text, valueSet, status}) => {

    return (
        <View style={styles.container}>
            <Image/>
            <Text>{text}</Text>
            <Switch style={styles.switchStyle} value={status} onValueChange={(e)=> valueSet(e, text) } />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        borderStyle: 'solid',
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        height: 40,
        marginLeft: 6,
        marginRight: 6
    },

    switchStyle: {
        borderStyle: 'solid',
        borderColor: '#ECECEC',
        borderWidth: 1,
        borderRadius: 13
    }
});

export default Category;