import React from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity, Dimensions, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
let {height, width} = Dimensions.get('window');
import { Ionicons } from '@expo/vector-icons';


class EditProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          text:"demi"
        };

        this.onChangeText = this._onChangeText.bind(this);
    }

    _onChangeText (text) {
      this.setState({text});
    }

    render () {
        return (
            <View>
              <Circle/>
            </View>
        )
    }
}

const Circle = ({url, click}) => {
    return (
        <View style={styles.center}>
            <TouchableOpacity onPress={() => click()}>
                <View style={{justifyContent: 'center', height:((15 / 100) * height)}}>
                    <View style={styles.circle}>
                        <Image  style={{width: 70, height: 70, borderRadius: 70/2 }}
                            source={{ uri:
                            'http://res.cloudinary.com/dd58mfinr/image/upload/v1481734664/default.png' || url} } />
                    </View>
                </View>
            </TouchableOpacity>
            <View>
                <Text style={{justifyContent: 'center', padding: 10,  fontWeight: 'bold', color:'#71b5ed'}}> Change Profile Photo </Text>
            </View>

            <View  style={styles.body}>
                <View style={{ flexDirection: 'row',  }}>
                    <Text style={{ width: ((30 /100) * width), paddingTop: 10 }}> Name </Text>
                    <View style={{ borderBottomColor: '#D3D3D3', borderBottomWidth: 1, paddingTop: 10, paddingBottom: 10, width: ((60 / 100)* width)}}>
                        <Text > Demilade Bamgbise </Text>
                    </View>

                </View>

                <View style={{ flexDirection: 'row',  }}>
                    <Text style={{ width: ((30 /100) * width), paddingTop: 10 }}> Username </Text>
                    <View style={{ borderBottomColor: '#D3D3D3', borderBottomWidth: 1, paddingTop: 10, paddingBottom: 10, width: ((60 / 100)* width)}}>
                      <TextInput
                          editable={true}
                          style={{marginTop:10}}
                          onChangeText={this.onChangeText}
                          value= "tf"
                      />
                    </View>

                </View>

                <View></View>

                <View></View>

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
    // return {
    //     upload: state.upload,
    //     files: state.files,
    //     user: state.user.presentUser,
    //     likedFiles: state.user.likedFiles
    // }
}

export default connect(null, null)(EditProfile);
