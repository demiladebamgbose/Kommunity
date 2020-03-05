import React from 'react';
import { StyleSheet, Text, View , Button, Alert, TextInput, TouchableOpacity, Dimensions, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/userActions';
import { NavigationActions } from 'react-navigation'
let {height, width} = Dimensions.get('window');
import {SecureStore} from 'expo';


class PasswordEntry extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
          username: '',
          password: '',
          confirmPassword: '',
          fullName: '',
          error: this.props.errors
        };
    }

    _onUserNameChange = (username) => {
        this.setState({ username });
        this.props.formChange('username', username);
    };

    _onFullNameChange = (fullName) => {
        this.setState({ fullName });
        this.props.formChange('fullName', fullName);
    };

    _onPasswordChange = (password) => {
        this.setState({ password });
        this.props.formChange('password', password);
    };

    _onConfirmPasswordChange = (confirmPassword) => {
        this.setState({ confirmPassword });
        this.props.formChange('confirmPassword', confirmPassword);
    };

    componentWillReceiveProps(nextProps) {
        this.setState({error: nextProps.errors});
    }

    render() {
        return (
            <View style={{padding:10}}>
            <Text style={styles.notifyText}>Last step to join KOMMUNITY</Text>
                <View style={styles.buttonContainer}>
                    <TextInput
                        style={{ paddingLeft: 10, fontSize: 14, height: 40,  fontFamily:
                        'Arial', borderColor: '#D5D5D5', borderWidth: 1, borderRadius: 5, backgroundColor: '#E5E5E5'}}
                        placeholder='Full name'
                        onChangeText={this._onFullNameChange}
                        value={this.state.fullName}
                    />
                    <Text style={styles.centerText} > {this.state.error.fullName}</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TextInput
                        style={{ paddingLeft: 10, fontSize: 14, height: 40,  fontFamily: 'Arial', borderColor: '#D5D5D5', borderWidth: 1, borderRadius: 5, backgroundColor: '#E5E5E5'}}
                        placeholder='Username'
                        onChangeText={this._onUserNameChange}
                        value={this.state.username}
                    />
                    <Text style={styles.centerText} > {this.state.error.username}</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TextInput
                        style={{ paddingLeft: 10, fontSize: 14, height: 40,  fontFamily: 'Arial', borderColor: '#D5D5D5', borderWidth: 1, borderRadius: 5, backgroundColor: '#E5E5E5'}}
                        placeholder='Password'
                        onChangeText={this._onPasswordChange}
                        value={this.state.password}
                        secureTextEntry={true}
                    />
                    <Text style={styles.centerText} > {this.state.error.password}</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TextInput
                        style={{ paddingLeft: 10, fontSize: 14, height: 40,  fontFamily: 'Arial', borderColor: '#D5D5D5', borderWidth: 1, borderRadius: 5, backgroundColor: '#E5E5E5'}}
                        placeholder='Confirm Password'
                        onChangeText={this._onConfirmPasswordChange}
                        value={this.state.confirmPassword}
                        secureTextEntry={true}
                    />
                    <Text style={styles.centerText} > {this.state.error.confirmPassword}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    baseText: {
        fontFamily: 'Cochin',
    },

    buttonContainer: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20
    },
    alternativeLayoutButtonContainer: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    notifyText: {
        color: 'red',
        marginLeft: 20
    },
    centerText: {
        color: 'red'
    },
    logInText: {
        textAlign: 'center',
        color: 'white',
        alignItems:'center',
        fontWeight: 'bold',
        fontSize: 14,
        fontFamily: 'Arial-BoldMT'
    },
    logButton: {
        marginTop: 10,
        paddingTop: 12,
        paddingBottom: 12,
        backgroundColor: '#b0c4de',
        borderRadius: 5
    },
    logButtonClicked: {
        marginTop: 10,
        paddingTop: 12,
        paddingBottom: 12,
        backgroundColor: '#3B5998',
        borderRadius: 5
    },
});

function mapDispatchToProps(dispatch) {
    return {
        //action: bindActionCreators(userActions, dispatch)
    }
}

function mapStateToProps(state, ownProps) {
    return {
      //  user: state.user
    }
}

export default connect(null, null)(PasswordEntry);
