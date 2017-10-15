/**
 * Created by jolaadeadewale on 15/10/2017.
 */

import React from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, Text, Dimensions} from 'react-native';
let {height, width} = Dimensions.get('window');
import {
    StackNavigator
} from 'react-navigation';

class Forgot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            error: ''
        };
    }

    static navigationOptions = {
        title: 'KOMMUNITY',
        headerStyle: {backgroundColor: '#b0c4de', height: (height/ 3.6)},
        headerTintColor: 'white',
        headerTitleStyle: {
            fontFamily: 'Noteworthy-Bold',
            fontSize: 31
        },
        headerBackTitle: null,
        headerBackTitleStyle: {display: 'none'}
    };

    _onEmailChange = (email) => {
        this.setState({email});
    };

    render () {
        return (
            <View style={styles.container}>
                <View style={styles.centerContent}>
                    <TextInput
                        value={this.state.email}
                        placeholder='Enter Your Email'
                        onChangeText={this._onEmailChange}
                        style={styles.textBox}
                    />
                    <TouchableOpacity style={styles.blueButton}>
                        <Text style={styles.buttonText}>Confirm</Text>
                    </TouchableOpacity>

                    <Text style={styles.centerText}> {this.state.error} </Text>

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
    },

    editModalTop: {
        borderColor: '#D3D3D3',
        borderWidth: 1,
        borderStyle: 'solid',
        paddingTop: 25,
        backgroundColor: '#f3f3f3',
        flexDirection: 'row',
        height:((12 / 100) * height),
        justifyContent:'space-between'
    },

    centerText: {
        marginTop: 10,
        textAlign: 'center',
        color: 'red'
    },

});

const ForgotPassword = StackNavigator({

    PasswordTab: {
        screen: Forgot
    }
},{
    headerMode: 'none'
});

export default ForgotPassword;
