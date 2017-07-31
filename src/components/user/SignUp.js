import React from 'react';
import { StyleSheet,
            Text, View ,
            Button, Alert, TextInput,
            TouchableOpacity, ScrollView, Dimensions
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/userActions';
let {height, width} = Dimensions.get('window');

class SignUp extends React.Component {

    static navigationOptions = {
        title: 'KOMMUNITY',
        headerStyle: {backgroundColor: '#b0c4de', height: (height/ 3)},
        headerTintColor: 'white',
        headerTitleStyle: {
            fontFamily: 'Noteworthy-Bold',
            fontSize: 31
        },
        headerBackTitle: null,
        headerBackTitleStyle: {display: 'none'}
    };

    constructor(props) {
        super(props);
        this.state = {'email': '', 'password': '', 'lastName' : '', 'firstName': '', 'username': '', 'repassword': ''};
    }

    _onLogin = () => {

    };

    _onPressButton = () => {

    };

    _onSignup = () => {
        let username = this.state.username;
        let password = this.state.password;
        let lastName = this.state.lastName;
        let firstName = this.state.firstName;
        let email = this.state.email;
        let name = {lastName, firstName};


       const userData =  {username, password, name, password, email};

        this.props.action.createUser(userData).then((message) => {
            console.log(message);

            const { navigate } = this.props.navigation;
            navigate('Landing', { name: message })
        }).catch(err=> {
            console.log(err);
        });

    };

    _onLinkToLogIn = () => {
        const { navigate } = this.props.navigation;
        navigate('Home', { name: 'Jane' })
    };

    _onForgotPassword = () => {

    };

   /* render() {

        return (

            <ScrollView style={styles.container}>
                <View style={styles.center}>
                <View style={styles.buttonContainer}>
                    <TextInput
                        style={{ paddingLeft: 10, fontSize: 14, height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, backgroundColor: '#D3D3D3'}}
                        placeholder='Enter Email'
                        onChangeText={(text) => this.setState({'email': text})}
                        value={this.state.email}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TextInput
                        style={{ paddingLeft: 10, fontSize: 14, height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, backgroundColor: '#D3D3D3'}}
                        placeholder='Enter Username'
                        onChangeText={(text) => this.setState({'username': text})}
                        value={this.state.username}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TextInput
                        style={{ paddingLeft: 10, fontSize: 14, height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, backgroundColor: '#D3D3D3'}}
                        placeholder='Enter Last Name'
                        onChangeText={(text) => this.setState({'lastName': text})}
                        value={this.state.lastName}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TextInput
                        style={{ paddingLeft: 10, fontSize: 14, height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, backgroundColor: '#D3D3D3'}}
                        placeholder='Enter First Name'
                        onChangeText={(text) => this.setState({'firstName': text})}
                        value={this.state.firstName}
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
                    <TextInput
                        style={{ paddingLeft: 10, fontSize: 14, height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, backgroundColor: '#D3D3D3'}}
                        secureTextEntry={true}
                        placeholder='Verify Password'
                        onChangeText={(text) => this.setState({'repassword': text})}
                        value={this.state.repassword}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={{borderRadius: 5, height: 40,  backgroundColor: '#0066CC',  borderWidth: 1}}
                        onPress={this._onSignup}

                    >
                        <Text style={styles.logInText} >Sign Up</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.alternativeLayoutButtonContainer}>
                    <Text style={{fontSize: 14}} onPress={this._onLinkToLogIn}>Log In</Text>
                    <Text style={{fontSize: 14, textDecorationLine: 'underline'}} onPress={this._onForgotPassword}>Forgot Password </Text>
                </View>


            </View>
            </ScrollView>

        );
    } */

   render () {
       return (
           <ScrollView style={styles.container}>
               <View style={styles.center}>
                   <View style={styles.buttonContainer}>
                       <TextInput
                           style={{ paddingLeft: 10, fontSize: 14, height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, backgroundColor: '#D3D3D3'}}
                           placeholder='Enter Email'
                           onChangeText={(text) => this.setState({'email': text})}
                           value={this.state.email}
                       />
                   </View>

                   <View style={styles.buttonContainer}>
                       <TextInput
                           style={{ paddingLeft: 10, fontSize: 14, height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, backgroundColor: '#D3D3D3'}}
                           placeholder='Enter Username'
                           onChangeText={(text) => this.setState({'username': text})}
                           value={this.state.username}
                       />
                   </View>

                   <View style={styles.buttonContainer}>
                       <TextInput
                           style={{ paddingLeft: 10, fontSize: 14, height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, backgroundColor: '#D3D3D3'}}
                           placeholder='Enter Last Name'
                           onChangeText={(text) => this.setState({'lastName': text})}
                           value={this.state.lastName}
                       />
                   </View>
               </View>
           </ScrollView>
       )
   }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    center: {
        flex: 1,
        justifyContent: 'center'
    },
    buttonContainer: {
        margin: 20,
        marginBottom: 5
    },
    alternativeLayoutButtonContainer: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
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

export default connect(null, mapDispatchToProps)(SignUp);