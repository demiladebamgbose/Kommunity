/**
 * Created by jolaadeadewale on 16/10/2017.
 */
import React from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, Text, Dimensions} from 'react-native';
let {height, width} = Dimensions.get('window');
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../../actions/userActions';
let headerSize = 31;

if (width < 375) {
    headerSize = 20;
}

class Forgot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            error: '',
            confirm: false,
            emailResponse: false
        };
    }

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

    _onEmailChange = (email) => {
        this.setState({email});

        if(this.validateEmail(email)) {
            this.setState({confirm: true});
        }else{
            this.setState({confirm: false});
        }
    };

    _confirmEmail = () => {
        this.props.action.resetPassword(this.state.email).then( data => {
            if(this.props.message = 'Reset'){
                this.setState({emailResponse: true, error: `Email link has been successfully sent to ${this.state.email} !!`});
            }else{

            }

        })
    };

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
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
                    <TouchableOpacity
                        onPress={this._confirmEmail}
                        disabled={!this.state.confirm}
                        style={ (this.state.confirm) ? styles.blueButton : styles.logButton}>
                        <Text style={styles.buttonText}>Confirm</Text>
                    </TouchableOpacity>
                    <Text style={ (this.state.emailResponse ? styles.verifyText: styles.centerText)}> {this.state.error} </Text>
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
    verifyText: {
        marginTop: 10,
        textAlign: 'center',
        color: 'green'
    },
    centerText: {
        marginTop: 10,
        textAlign: 'center',
        color: 'red'
    },
    logButton: {
        marginTop: 10,
        paddingTop: 12,
        paddingBottom: 12,
        backgroundColor: '#b0c4de',
        borderRadius: 5
    }

});

function mapStateToProps(state, ownProps) {
    return {
        user: state.user.presentUser,
        message: state.user.passwordMessage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(userActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Forgot);
