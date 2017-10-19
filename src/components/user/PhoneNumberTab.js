/**
 * Created by jolaadeadewale on 01/08/2017.
 */
/**
 * Created by jolaadeadewale on 01/08/2017.
 */

import React from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, Text, Modal, Dimensions} from 'react-native';
let {height, width} = Dimensions.get('window');
import PasswordEntry from './PasswordEntry';
import PhoneInput from 'react-native-phone-input'
import { NavigationActions } from 'react-navigation'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/userActions';


class PhoneTab extends React.Component {

    static navigationOptions = {
        tabBarLabel: 'Phone'
    };

    constructor(props) {
        super(props);
        this.state = {
             number: '',
             modalVisible: false,
             error: '',
             formData: {},
             formDataError: {},
             enabled : false,
             visible: false
        }
    }

    _onNumberChange = (number) => {
        this.setState({number: number});
        if(this.state.number.length >= 4){
            this.setState({enable: true});
        }else{
            this.setState({enable: false});
        }
    };

    _toggleModal = (toggleState) => {
        if (!this.state.number || this.state.number.length < 5) {
          this.setState({ error: 'Enter a valid phone number'});
          return;
        }else{
            this.setState({ error: ''});
        }

        this.setState({ modalVisible: toggleState });
    };

    _formChange = (key, value) => {
        this.state.formData[key] = value;
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


    _doneCliked = () => {
        if (this._validateFormData (this.state.formData)) {
            let obj = this.state.formData;
            obj.email = `${this._onPhone()} ${this.state.number}`;
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

    _onPhone = (e) => {
        return this.refs.phone.getValue()
    };

    render () {
        return (
            (this.state.visible) ?<View style={{ flex: 1 , height: height}}>
                    <Spinner visible={this.state.visible} style={{backgroundColor: 'blue'}}
                             overlayColor="#b0c4de"
                             textContent={"Loading..."} textStyle={{color: 'white'}} />
                </View>:
            <View style={styles.container}>
                <View style={[styles.centerContent]}>
                    <View style={styles.textBox}>
                        <View style={styles.horizontalBox}>

                                <PhoneInput ref='phone'
                                            initialCountry='ng'
                                            onChangePhoneNumber={this._onPhone}
                                />


                            <View style={styles.separator}></View>

                            <TextInput
                                style={{
                                    fontSize: 14, height: 30,  fontFamily: 'Arial',
                                    width: 250, backgroundColor: '#E5E5E5', paddingBottom: 1, marginLeft: 4
                                }}
                                onChangeText={this._onNumberChange}
                                value={this.state.number}
                                placeholder='9097438705'
                            />

                        </View>
                    </View>
                    <TouchableOpacity disabled={!this.state.enable}
                                      onPress={()=>{this._toggleModal(true)}}
                                      style={(this.state.enable) ? styles.blueButton : styles.logButton}>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>


                    <Text style={styles.centerText}> {this.state.error} </Text>

                    <Modal animationType="slide" transparent={false} visible={this.state.modalVisible}
                           onRequestClose={() => {alert("Modal has been closed.")}}>
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
                             <PasswordEntry formChange={this._formChange}  errors= {this.state.formDataError}/>

                         </View>
                    </Modal>
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

    horizontalBox: {
        flexDirection: 'row',
        flex: 1,
        padding: 7
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
    textCenter: {
        textAlign: 'center',
        alignItems:'center',
        fontWeight: 'bold',
        fontSize: 14,
        fontFamily: 'Arial-BoldMT',
        paddingTop: 5
    },
    textBox: {
        paddingLeft: 10, height: 40,
        borderColor: '#D5D5D5',
        borderWidth: 1, borderRadius: 5,
        backgroundColor: '#E5E5E5'
    },

    inputBox: {
        width: 80,
        height: 30
    },
    separator: {
        borderRightWidth: 1,
        borderRightColor: '#D3D3D3',
        marginLeft: 5
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

export default connect(mapStateToProps, mapDispatchToProps)(PhoneTab);
