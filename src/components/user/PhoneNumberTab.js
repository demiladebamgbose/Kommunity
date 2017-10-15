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


class PhoneTab extends React.Component {

    static navigationOptions = {
        tabBarLabel: 'Phone'
    };

    constructor(props) {
        super(props);
        this.state = {
            'number': '',
            'modalVisible': false,
            'error': '',
            'formData': {},
            'formDataError': {}, 
        }
    }

    _onNumberChange = (number) => {
        this.setState({number: number});
    };

    _toggleModal = (toggleState) => {
        if (!this.state.number || this.state.number.length < 5) {
          this.setState({ error: 'Enter a valid phone number'});
          return;
        }

        this.setState({ modalVisible: toggleState });
    }

    _formChange = (key, value) => {
        this.state.formData[key] = value;

    }

    _doneCliked = () => {
        console.log(this.state.formData);
    }

    render () {
        return (
            <View style={styles.container}>
                <View style={[styles.centerContent]}>
                    <View style={styles.textBox}>
                        <View style={styles.horizontalBox}>
                            <Text style={[styles.textCenter, {color: '#3B5998'}]}>
                                +234
                            </Text>

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
                    <TouchableOpacity onPress={()=>{this._toggleModal(true)}} style={styles.blueButton} >
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>


                    <Text style={styles.centerText}> {this.state.error} </Text>

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
});

export default PhoneTab;
