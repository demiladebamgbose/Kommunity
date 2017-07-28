import React from 'react';
import { StyleSheet, Text, View , Button, Alert, TextInput, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/userActions';

class Login extends React.Component {

    static navigationOptions = {
        title: 'KOMMUNITY',
    };

    constructor(props) {
        super(props);
        this.state = {'username': '', 'password': '', 'information': ''};
    }

    _onLogin = () =>{
        const username = this.state.username;
        const password = this.state.password;
        let that = this;

        let userData = {username, password};
        this.props.action.logUserIn(userData).then((response)=> {
            if(that.props.user.message.response.indexOf('user') !== -1) {
                console.log(that.props.user);
                const { navigate } = this.props.navigation;
                navigate('Landing', { name: response });
            } else{
                that.setState({information: that.props.user.message.response});
            }

        }).catch(err=> {
            console.log(err);
        });

    };

    _onLinkToSignUp = () =>{
        const { navigate } = this.props.navigation;
        navigate('SignUp', { name: 'Jane' })

    };

    _onForgotPassword = () =>{

    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <TextInput
                        style={{ paddingLeft: 10, fontSize: 14, height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, backgroundColor: '#D3D3D3'}}
                        placeholder='Enter Email or Username'
                        onChangeText={(text) => this.setState({'username': text})}
                        value={this.state.username}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TextInput
                        style={{ paddingLeft: 10, fontSize: 14, height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, backgroundColor: '#D3D3D3'}}
                        secureTextEntry={true}
                        placeholder='Enter Password'
                        onChangeText={(text) => this.setState({'password': text})}
                        value={this.state.password}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={{borderRadius: 5, height: 40,  backgroundColor: '#0066CC',  borderWidth: 1}}
                        onPress={this._onLogin}

                    >
                        <Text style={styles.logInText} >Login</Text>
                    </TouchableOpacity>
                    <Text style={styles.centerText}>{this.state.information}</Text>
                </View>
                <View style={styles.alternativeLayoutButtonContainer}>
                    <Text style={{fontSize: 14}} onPress={this._onLinkToSignUp}>Sign Up</Text>
                    <Text style={{fontSize: 14, textDecorationLine: 'underline'}} onPress={this._onForgotPassword}>Forgot Password </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonContainer: {
        margin: 20
    },
    alternativeLayoutButtonContainer: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    centerText: {
        textAlign: 'center',
        color: 'red'
    },
    logInText: {
        textAlign: 'center',
        color: 'white',
        alignItems:'center',
        paddingTop: 8,
        fontSize: 14
    }
});

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(userActions, dispatch)
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
