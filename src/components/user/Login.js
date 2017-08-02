import React from 'react';
import { StyleSheet, Text, View , Button, Alert, TextInput, TouchableOpacity, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/userActions';
let {height, width} = Dimensions.get('window');


class Login extends React.Component {


    static navigationOptions = {
        title: 'KOMMUNITY',
        headerStyle: {backgroundColor: '#b0c4de', height: (height/ 3)},
        headerTintColor: 'white',
        headerTitleStyle: {
            fontFamily: 'Noteworthy-Bold',
            fontSize: 31
        },
        left:null
    };


    constructor(props) {

        super(props);
        this.state = {
            'username': '',
            'password': '',
            'information': '',
            'screnHeight': height,
            'screenWidth': width,
            'complete': false
        };
    }

    _onUserNameChange = (username) => {
        this.setState({'username': username});

        if(this.state.username && this.state.password) {
            this.setState({complete: true});
        }else{
            this.setState({complete: false});
        }
    };


    _onPasswordChange = (password) => {
        this.setState({'password': password});

        if(this.state.username && this.state.password) {
            this.setState({complete: true});
        }else{
            this.setState({complete: false});
        }
    };

    _onLogin = () => {
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
                <View>
                </View>
                <View style={styles.buttonContainer}>
                    <TextInput
                        style={{ paddingLeft: 10, fontSize: 14, height: 40,  fontFamily: 'Arial', borderColor: '#D5D5D5', borderWidth: 1, borderRadius: 5, backgroundColor: '#E5E5E5'}}
                        placeholder='Enter Email or Username'
                        onChangeText={this._onUserNameChange}
                        value={this.state.username}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TextInput
                        style={{ paddingLeft: 10, fontSize: 14, height: 40,  fontFamily: 'Arial', borderColor: '#D5D5D5', borderWidth: 1, borderRadius: 5, backgroundColor: '#E5E5E5'}}
                        secureTextEntry={true}
                        placeholder='Enter Password'
                        onChangeText={this._onPasswordChange}
                        value={this.state.password}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={(this.state.complete) ? styles.logButtonClicked : styles.logButton}
                        onPress={this._onLogin}
                    >
                        <Text style={styles.logInText} >Login</Text>
                    </TouchableOpacity>
                    <Text style={styles.centerText}>{this.state.information}</Text>
                </View>
                <View style={styles.alternativeLayoutButtonContainer}>
                    <Text style={{fontSize: 14, fontFamily: 'Arial', color: '#3B5998', fontWeight: 'bold'}} onPress={this._onLinkToSignUp}>Sign Up</Text>
                    <Text style={{fontSize: 14, fontFamily: 'Arial', color: '#3B5998', fontWeight: 'bold'}} onPress={this._onForgotPassword}>Forgot Password </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    baseText: {
        fontFamily: 'Cochin',
    },
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
