import React, {} from 'react';
import { StyleSheet,
    Text,
    View ,
    Button,
    Alert,
    TextInput,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
    KeyboardAvoidingView,
    Modal
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/userActions';
import { NavigationActions } from 'react-navigation'
let {height, width} = Dimensions.get('window');
import {SecureStore} from 'expo';
import dismissKeyboard from 'react-native-dismiss-keyboard';


let headerSize = 31;
if (width < 375) {
    headerSize = 20;
}

class Login extends React.Component {

    static navigationOptions = {
        title: 'KOMMUNITY',
        headerStyle: {backgroundColor: '#b0c4de', height: (height/ 3.6)},
        headerTintColor: 'white',
        headerTitleStyle: {
            fontFamily: 'Noteworthy-Bold',
            fontSize: headerSize
        },
        left:null
    };


    constructor(props) {

        super(props);
        this.state = {
            username: '',
            password: '',
            information: '',
            screnHeight: height,
            screenWidth: width,
            complete: false,
            animating: false,
            modalVisible: false,
            showReturn: false,
            disableText: false
        };
    }

    async componentDidMount(){
        if(await SecureStore.getItemAsync("Ixoti")){
            let username = await SecureStore.getItemAsync("Ixoti");
            let password = await SecureStore.getItemAsync("Pxye");

            this.setState({'username': username,
                'password': password}
            );
            this._onLogin();
        }
    }

    _onUserNameChange = (username) => {
        this.setState({'username': username});

        if((this.state.password.length > 0) && username) {
            this.setState({complete: true});
        }else{
            this.setState({complete: false});
        }

        if(this.state.password || this.state.username) {
            this.setState({showReturn: true});
        }else{
            this.setState({showReturn: false});
        }
    };


    _onPasswordChange = (password) => {
        this.setState({'password': password});

        if((this.state.username.length > 0) && password) {
            this.setState({complete: true});
        }else{
            this.setState({complete: false});
        }

        if(this.state.password || this.state.username) {
            this.setState({showReturn: true});
        }else{
            this.setState({showReturn: false});
        }
    };

    _onLogin = () => {
        const username = this.state.username;
        const password = this.state.password;
        let that = this;

        let userData = {username, password};
        this.setState({animating: true, complete: false});
        this.props.action.logUserIn(userData).then((response)=> {
            this.setState({animating: false, complete: true});

            if(this.props.user.presentUser._id) {
                SecureStore.setItemAsync("Ixoti", username);
                SecureStore.setItemAsync("Pxye", password);

                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Landing'})
                    ]
                });
                this.props.navigation.dispatch(resetAction)
            } else {
                SecureStore.deleteItemAsync("Ixoti");
                SecureStore.deleteItemAsync("Pxye");
                this.setState({information: this.props.user.presentUser.error});
            }

        }).catch(err=> {
            console.log(err);
        });

    };

    _onLinkToSignUp = () =>{
        const { navigate } = this.props.navigation;
        navigate('SignUp', { name: '' })
    };

    _onForgotPassword = () =>{
        const { navigate } = this.props.navigation;
        navigate('ForgotPassword', { name: '' })
    };

    _handleKeyDown = (e) => {
        if(e.nativeEvent.key == "Enter") {
            dismissKeyboard();
            this._onLogin();
        }
    };

    _onEdited = () => {
        if(this.state.password.length && this.state.username.length) {
            dismissKeyboard();
        }
    };

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
            >
            <View style={styles.container}>
                <View>
                </View>
                <View style={styles.buttonContainer}>
                    <TextInput
                        style={{ paddingLeft: 10, fontSize: 14, height: 40,  fontFamily: 'Arial', borderColor: '#D5D5D5', borderWidth: 1, borderRadius: 5, backgroundColor: '#E5E5E5'}}
                        placeholder='Enter Email or Username'
                        onChangeText={this._onUserNameChange}
                        disabled={true}
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
                        returnKeyType={(this.state.showReturn) ? 'done': 'none'}
                        onKeyPress={this._handleKeyDown}
                        onSubmitEditing={this._onLogin}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        disabled={!this.state.complete}
                        style={(this.state.complete) ? styles.logButtonClicked : styles.logButton}
                        onPress={this._onLogin}
                    >
                        <Text style={styles.logInText} >Login</Text>
                    </TouchableOpacity>
                    <Text style={styles.centerText}>{this.state.information}</Text>
                    <ActivityIndicator
                        animating = {this.state.animating}

                        size = "large"
                        style = {styles.activityIndicator}
                    />
                </View>
                <View style={styles.alternativeLayoutButtonContainer}>
                    <TouchableOpacity  onPress={this._onLinkToSignUp}>
                        <Text style={{fontSize: 14, fontFamily: 'Arial', color: '#3B5998', fontWeight: 'bold'}}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._onForgotPassword}>
                        <Text style={{fontSize: 14, fontFamily: 'Arial', color: '#3B5998', fontWeight: 'bold'}}>Forgot Password </Text>
                    </TouchableOpacity>
                </View>
            </View>

                <View style={{ height: 0}} />
            </KeyboardAvoidingView>
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
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
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
