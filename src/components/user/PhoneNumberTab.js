/**
 * Created by jolaadeadewale on 01/08/2017.
 */
/**
 * Created by jolaadeadewale on 01/08/2017.
 */

import React from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, Text} from 'react-native';

class PhoneTab extends React.Component {

    static navigationOptions = {
        tabBarLabel: 'Phone'
    };

    constructor(props) {
        super(props);
        this.state = {
            'number': ''
        }
    }

    _onNumberChange = (number) => {
        this.setState({number: number});
    };

    render () {
        return (
            <View style={styles.container}>
                <View style={[styles.centerContent]}>
                    <View style={styles.textBox}>
                        <View style={styles.horizontalBox}>
                            <Text style={[styles.textCenter, {color: '#3B5998'}]}>
                                +234
                            </Text>

                            <View style={styles.separator}></View>

                            <TextInput
                                style={{
                                    fontSize: 14, height: 30,  fontFamily: 'Arial',
                                    width: 250, backgroundColor: '#E5E5E5', paddingBottom: 1, marginLeft: 4
                                }}
                                onChangeText={this._onNumberChange}
                                value={this.state.number}
                                placeholder='9097438705'
                            />
                        </View>
                    </View>
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

    horizontalBox: {
        flexDirection: 'row',
        flex: 1,
        padding: 7
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
    textCenter: {
        textAlign: 'center',
        alignItems:'center',
        fontWeight: 'bold',
        fontSize: 14,
        fontFamily: 'Arial-BoldMT',
        paddingTop: 5
    },
    textBox: {
        paddingLeft: 10, height: 40,
        borderColor: '#D5D5D5',
        borderWidth: 1, borderRadius: 5,
        backgroundColor: '#E5E5E5'
    },

    inputBox: {
        width: 80,
        height: 30
    },
    separator: {
        borderRightWidth: 1,
        borderRightColor: '#D3D3D3',
        marginLeft: 5
    }
});

export default PhoneTab;