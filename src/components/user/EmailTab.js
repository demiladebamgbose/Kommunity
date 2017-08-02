/**
 * Created by jolaadeadewale on 01/08/2017.
 */

import React from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, Text} from 'react-native';

class EmailTab extends React.Component {

    static navigationOptions = {
        tabBarLabel: 'Email'
    };

    render () {
        return (
            <View style={styles.container}>
                <View style={styles.centerContent}>
                    <TextInput
                        placeholder='Enter Your Email'
                        style={styles.textBox}
                    />

                <TouchableOpacity style={styles.blueButton}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'space-between',
    },

    centerContent: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 25,
        marginBottom: 20
    },
    blueButton: {
        marginTop: 10,
        paddingTop: 12,
        paddingBottom: 12,
        backgroundColor: '#3B5998',
        borderRadius: 5
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        alignItems:'center',
        fontWeight: 'bold',
        fontSize: 14,
        fontFamily: 'Arial-BoldMT'
    },
    textBox: {
        paddingLeft: 10, fontSize: 14, height: 40,
        fontFamily: 'Arial', borderColor: '#D5D5D5',
        borderWidth: 1, borderRadius: 5,
        backgroundColor: '#E5E5E5'
    }

});

export default EmailTab;