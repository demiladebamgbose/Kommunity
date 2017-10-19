/**
 * Created by jolaadeadewale on 01/08/2017.
 */

import React from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, Text, Modal, Dimensions} from 'react-native';
let {height, width} = Dimensions.get('window');
import PasswordEntry from './PasswordEntry';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/userActions';
import { NavigationActions } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';

class EmailTab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            modalVisible: false,
            error: '',
            formDataError: {},
            formData: {},
            center: false,
            enable: false,
            visible: false
        }
    }

    static navigationOptions = {
        tabBarLabel: 'Email'
    };

    _formChange = (key, value) => {
        this.state.formData[key] = value;
    };

    _doneCliked = () => {
        if (this._validateFormData (this.state.formData)) {
            let obj = this.state.formData;
            obj.email = this.state.email;
            obj.name = {firstName: this.state.formData.fullName.split(' ')[0] || '',
                lastName: this.state.formData.fullName.split(' ')[1] || ''
            };
            this.setState({visible: true});
            this.props.action.createUser(obj).then( data => {
                if(this.props.user._id) {

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
        } else {
          console.log("not validated");
        }
    };

    _validateFormData = (formData) => {

      let obj = {};
      let validated = true;

        if (!formData.fullName) {
            obj.fullName = 'Enter your full name';
            validated = false;
        }

        if (!formData.username) {
            obj.username = 'Enter a username';
            validated = false;
        }

        if (!formData.password) {
            obj.password = 'Enter a valid password';
            validated = false;
        }

        if (formData.password !== formData.confirmPassword) {
            obj.password = 'Passwords do not match';
            validated = false;
        }

        this.setState({ formDataError: obj });
        return validated;
    };

    _onEmailChange = (email) => {
        this.setState({email});

        if(this.state.email.length >= 3){
            this.setState({enable: true});
        }else{
            this.setState({enable: false});
        }
    };

   validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    _toggleModal = (toggleState) => {
      if (!this.validateEmail(this.state.email)) {
            this.setState({ error: 'Enter a valid email address'});
              if(this.state.email.length <= 1){
                  this.setState({center: true});
              } else{
                  this.setState({center: false});
              }
          return;
      }

      this.setState({ modalVisible: toggleState , error: ''});
    };

    render () {
        return (
            (this.state.visible) ?<View style={{ flex: 1 , height: height}}>
                    <Spinner visible={this.state.visible} style={{backgroundColor: 'blue'}}
                             overlayColor="#b0c4de"
                             textContent={"Loading..."} textStyle={{color: 'white'}} />
                </View>:
            <View style={styles.container}>
                <View style={styles.centerContent}>
                    <TextInput
                        value={this.state.email}
                        placeholder='Enter Your Email'
                        onChangeText={this._onEmailChange}
                        style={styles.textBox}
                    />

                <TouchableOpacity disabled={!this.state.enable}
                                  onPress={()=>{this._toggleModal(true)}}
                                  style={(this.state.enable) ? styles.blueButton : styles.logButton}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>

                <Text style={ (this.state.center) ? styles.centerText: styles.leftText}> {this.state.error} </Text>

                </View>


                <Modal animationType="slide" transparent={false} visible={this.state.modalVisible} onRequestClose={() => {alert("Modal has been closed.")}}>
                     <View>
                         <View style={styles.editModalTop}>
                             <TouchableOpacity onPress={()=>{this._toggleModal(false)}} >
                                 <Text style={{textAlign: 'left', padding: 12, fontSize: 20 }}>Cancel</Text>
                             </TouchableOpacity>
                             <Text style={{textAlign: 'center', padding: 12, fontSize: 20, fontWeight: 'bold',   }}>SignUp</Text>

                              <View style={{width:((20 / 100) * width)}}>
                                  <TouchableOpacity onPress={this._doneCliked}>
                                      <Text style={{textAlign: 'right', padding: 12, fontSize: 20 }}>Done</Text>
                                  </TouchableOpacity>
                              </View>
                         </View>
                         <PasswordEntry formChange={this._formChange} errors={this.state.formDataError}/>
                     </View>
                </Modal>

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
    leftText: {
        marginTop: 10,
        color: 'red',
        textAlign: 'left'
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

export default connect(mapStateToProps, mapDispatchToProps)(EmailTab);
