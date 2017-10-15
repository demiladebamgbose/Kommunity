import React from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity, Dimensions, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
let {height, width} = Dimensions.get('window');
import { Ionicons } from '@expo/vector-icons';
import { ImagePicker,
    Permissions,
} from 'expo';


class EditProfile extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            text:"demi",
            hasCameraPermission: false
        };
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    _onChangeText = (text) => {
        this.setState({'text': text});
    };

    _cameraRoll = async () => {
        if(!this.state.hasCameraPermission)
            return;

        let result = await ImagePicker.launchCameraAsync({  allowsEditing: true,
            aspect: [4, 3]});

        if (!result.cancelled) {
            this.setState({userImage: result.uri});
            console.log(result);
            /*this.props.action.uploadCameraImage(result).then(response => {
             this.props.screenProps.rootNavigation.navigate('UploadView');
             }).catch(err => {
             console.log(err);
             }); */
        }
    };

    _library = async () => {
        if(!this.state.hasCameraPermission)
            return;

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (!result.cancelled) {
            /*this.props.action.uploadCameraImage(result).then(response => {
                this.props.screenProps.rootNavigation.navigate('UploadView');
            }).catch(err => {
                console.log(err);
            }); */
        }
    };

    render () {
        return (
            <View>
                <Circle url={this.props.image} click={this._cameraRoll} library={this._library} />

                <View  style={styles.body}>
                    <View style={{ flexDirection: 'row',  }}>
                        <Text style={{ width: ((30 /100) * width), paddingTop: 10 }}> Name </Text>
                        <View style={{ borderBottomColor: '#D3D3D3', borderBottomWidth: 1, paddingTop: 10, paddingBottom: 10, width: ((60 / 100)* width)}}>
                            <TextInput
                                style={{fontSize: 14}}
                                onChangeText={this._onChangeText}
                                value={this.state.text}
                            />
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row',  }}>
                        <Text style={{ width: ((30 /100) * width), paddingTop: 10 }}> Email </Text>
                        <View style={{ borderBottomColor: '#D3D3D3', borderBottomWidth: 1, paddingTop: 10, paddingBottom: 10, width: ((60 / 100)* width)}}>
                            <TextInput
                                style={{fontSize: 14}}
                                onChangeText={this._onChangeText}
                                value={this.state.text}
                                keyboardType='email-address'
                            />

                        </View>

                    </View>

                    <View style={{ flexDirection: 'row',  }}>
                        <Text style={{ width: ((30 /100) * width), paddingTop: 10 }}> Phone </Text>
                        <View style={{ borderBottomColor: '#D3D3D3', borderBottomWidth: 1, paddingTop: 10, paddingBottom: 10, width: ((60 / 100)* width)}}>
                            <TextInput
                                style={{fontSize: 14}}
                                onChangeText={this._onChangeText}
                                value={this.state.text}
                                keyboardType='phone-pad'
                            />

                        </View>

                    </View>

                    <View style={{ flexDirection: 'row',  }}>
                        <Text style={{ width: ((30 /100) * width), paddingTop: 10 }}> Password </Text>
                        <View style={{ borderBottomColor: '#D3D3D3', borderBottomWidth: 1, paddingTop: 10, paddingBottom: 10, width: ((60 / 100)* width)}}>
                            <TextInput
                                style={{fontSize: 14}}
                                onChangeText={this._onChangeText}
                                value={this.state.text}
                                secureTextEntry={true}
                            />
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const Circle = ({url, click, library}) => {
    return (
        <View style={styles.center}>
            <TouchableOpacity onPress={() => click()}>
                <View style={{justifyContent: 'center', height:((15 / 100) * height)}}>
                    <View style={styles.circle}>
                        <Image  style={{width: 70, height: 70, borderRadius: 70/2 }}
                            source={{ uri:
                            url || 'http://res.cloudinary.com/dd58mfinr/image/upload/v1481734664/default.png'} } />
                    </View>
                </View>
            </TouchableOpacity>
            <View>
                <Text onPress={()=> library()} style={{justifyContent:
                'center', padding: 10,
                fontWeight: 'bold',
                color:'#71b5ed'}}> Import photo from Library </Text>
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    circle: {
        width: 70,
        height: 70,
        borderRadius: 70/2,
        backgroundColor: '#D3D3D3',
    },
    center: {
        alignContent: 'center',
        alignItems: 'center'
    },

    body: {
      borderColor: '#D3D3D3',
      height: ((65/100)  * height),
      width: width,
      padding: 10,
      borderWidth: 1,
      borderStyle: 'solid',
      backgroundColor: '#fff',
    }

});

function mapDispatchToProps(dispatch) {
    return {
        // action: bindActionCreators(fileActions, dispatch),
        // activity: bindActionCreators(fileActions, dispatch)
    }
}

function mapStateToProps(state, ownProps) {
    return {
         user: state.user.presentUser,
    }
}

export default connect(mapStateToProps, null)(EditProfile);
