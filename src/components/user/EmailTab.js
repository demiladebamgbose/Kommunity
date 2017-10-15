/**
 * Created by jolaadeadewale on 01/08/2017.
 */

import React from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, Text, Modal, Dimensions} from 'react-native';
let {height, width} = Dimensions.get('window');
import PasswordEntry from './PasswordEntry';

class EmailTab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'email': '',
            'modalVisible': false,
            'error': '',
            'formDataError': {},
            'formData': {},
        }
    }

    static navigationOptions = {
        tabBarLabel: 'Email'
    };

    _formChange = (key, value) => {
        this.state.formData[key] = value;

    }

    _doneCliked = () => {
        console.log(this.state.formData);
        if (this._validateFormData (this.state.formData)) {
            console.log("validated");
        } else {
          console.log("not validated");
        }

    }

    _validateFormData = (formData) => {
      let obj = {};
      let validated  = true;

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
    }

    _onEmailChange = (email) => {
        this.setState({email});
    };


   validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    _toggleModal = (toggleState) => {
      if (!this.validateEmail(this.state.email)) {
        this.setState({ error: 'Enter a valid email address'});
        return;
      }
      this.setState({ modalVisible: toggleState });
    }

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

                <TouchableOpacity onPress={()=>{this._toggleModal(true)}} style={styles.blueButton}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>

                <Text style={styles.centerText}> {this.state.error} </Text>

                </View>


                <Modal animationType="slide" transparent={false} visible={this.state.modalVisible} onRequestClose={() => {alert("Modal has been closed.")}}>
                     <View>
                         <View style={styles.editModalTop}>
                             <TouchableOpacity onPress={()=>{this._toggleModal(false)}} >
                                 <Text style={{textAlign: 'left', padding: 12, textSize: 20 }}>Cancel</Text>
                             </TouchableOpacity>
                             <Text style={{textAlign: 'center', padding: 12, textSize: 20, fontWeight: 'bold',   }}>SignUp</Text>

                              <View style={{width:((20 / 100) * width)}}>
                                  <TouchableOpacity onPress={this._doneCliked}>
                                      <Text style={{textAlign: 'right', padding: 12, textSize: 20 }}>Done</Text>
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

    centerText: {
        marginTop: 10,
        textAlign: 'center',
        color: 'red'
    },

});

export default EmailTab;
