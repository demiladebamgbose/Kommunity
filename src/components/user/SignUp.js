/*import React from 'react';
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

*/


import { Constants} from 'expo';
import React from 'react';
import { Alert, Button, Linking, StyleSheet, View,
    Text, TextInput,
    TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/userActions';
import { NavigationActions } from 'react-navigation';
let {height, width} = Dimensions.get('window');
import Spinner from 'react-native-loading-spinner-overlay';

let headerSize = 31;
if (width < 375) {
    headerSize = 20;
}

 class SignUp extends React.Component {

     state = {
        visible: false,
         headerHeight: (height/ 3.6)
     };
     static navigationOptions = {
         title: 'KOMMUNITY',
         headerStyle: {backgroundColor: '#b0c4de', height: (height/ 3.6)},
         headerTintColor: 'white',
         headerTitleStyle: {
             fontFamily: 'Noteworthy-Bold',
             fontSize: headerSize
         },
         headerBackTitle: null,
         headerBackTitleStyle: {display: 'none'}
     };

     _onLinkToSign =()=> {
         const resetAction = NavigationActions.reset({
             index: 0,
             actions: [
                 NavigationActions.navigate({ routeName: 'Home'})
             ]
         });
         this.props.navigation.dispatch(resetAction)
     };

     _onTabSignUp = ()=> {
         const { navigate } = this.props.navigation;
         navigate('LoginTab', { name: 'LogIn' });
     };

    render() {
        return (
        (this.state.visible) ?<View style={{ flex: 1 , height: height}}>
                <Spinner visible={this.state.visible} style={{backgroundColor: 'blue'}}
                         overlayColor="#b0c4de"
                         textContent={"Loading..."} textStyle={{color: 'white'}} />
            </View>:
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.logButtonClicked}
                        onPress={this._handlePressSignIn}
                    >
                        <Text style={styles.signInText}>Sign in with Facebook</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.alternativeLayoutButtonContainer}>
                    <Text style={styles.text}>   </Text>
                    <Text style={styles.orText}>OR</Text>
                    <Text style={styles.text}>    </Text>
                </View>
                <View style={styles.buttonContainerText}>
                    <TouchableOpacity  onPress={this._onTabSignUp}>
                        <Text  style={{fontSize: 14, fontFamily: 'Arial', color: '#3B5998', fontWeight: 'bold', textAlign: 'center'}}>
                            Sign Up with Phone or Email
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.alternativeLayout}>
                    <Text style={{ textAlign: 'center',  color: 'grey'}}>
                        Already have an account ?
                    </Text>
                    <TouchableOpacity  onPress={this._onLinkToSign}>
                        <Text  style={{ textAlign: 'center', fontSize: 14, fontFamily: 'Arial', color: '#3B5998', fontWeight: 'bold', marginLeft: 2}}>
                            Sign In.
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }


    _handlePressSignIn = async () => {
        const fbukId = Constants.manifest.facebookScheme;

        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(fbukId, {
            permissions: ['public_profile', 'email'],
        });
        if (type === 'success') {
            this.setState({visible: true});
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,first_name,last_name,gender,picture,email`);
            const json = await response.json();

            if (json) {
                let obj = {name: {}};
                obj.email = json.email;
                obj.name.firstName = json.first_name;
                obj.name.lastName = json.last_name;
                obj.username = json.email;
                obj.password = json.id;
                if (json.picture) {
                    obj.image = json.picture.data.url;
                }
                obj.fb = true;
                this.props.action.createUser(obj).then(response => {
                    if(this.props.user.presentUser._id) {

                        const resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'Landing'})
                            ]
                        });
                        this.props.navigation.dispatch(resetAction)

                    } else {
                        const resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'Landing'})
                            ]
                        });
                        this.props.navigation.dispatch(resetAction)
                    }
                });
            }
        }
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },

    center: {
        flex: 1,
        justifyContent: 'center'
    },
    buttonContainer: {
        margin: 20,
        marginBottom: 5
    },
    buttonContainerText: {
        margin: 20,
        alignItems:'center',
    },
    alternativeLayoutButtonContainer: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    alternativeLayout: {
        margin: 20,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center'
    },
    signInText: {
        textAlign: 'center',
        color: 'white',
        alignItems:'center',
        fontWeight: 'bold',
        fontSize: 14,
        fontFamily: 'Arial-BoldMT'

    },

    logButtonClicked: {
        marginTop: 10,
        paddingTop: 12,
        paddingBottom: 12,
        backgroundColor: '#3B5998',
        borderRadius: 5
    },
    text: {
        color: '#C0C0C0',
        fontSize: 18,
        textAlign: 'justify',
        lineHeight: 30,
        borderBottomWidth: 1
    },

    orText: {
        color: 'grey'
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
