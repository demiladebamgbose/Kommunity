import React from 'react';
import {Text, View, Image, Switch, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as uploadActions from '../../actions/uploadActions';



class Upload extends React.Component {

    constructor(props, context){
        super(props);
        this.state = {
            'image': this.props.upload.image,
            'private': false,
            'caption' : ''
        }
    }

    _onUpload = () => {
        let caption = this.state.caption;
        let image = this.state.image;

        const API_SECRET = 'TM3fIlzxg0QtEculwXfXolRyE8E';
        const PRESET_NAME = 'sw64gmsy';
        const url = 'https://api.cloudinary.com/v1_1/dd58mfinr/upload';
        const uri = image;

        const obj = {
            url, uri, preset: PRESET_NAME
        };

        let that = this;

        this.props.action.uploadFileCloud(obj).then( data=> {
            const fileUplod = that.props.upload.cloudResponse;
            const userId = that.props.user.message.user._id;
            const status = that.state.private;
            const caption = that.state.caption;

            let dataObj = {
                owner: userId,
                content: fileUplod,
                status: status,
                caption: caption,
                tags : [],
                hashtags: []
            };

            that.props.action.uploadFileToServer(dataObj).then( data => {

                if(that.props.upload.serverResponse) {
                    const { navigate } = that.props.navigation;
                    navigate('HomeTab', { user: userId })
                }

            }).catch(err => {
                console.log(err);
            });

        }).catch(err => {
           console.log(err);
        });
    };

    render () {
        return (
            <View style={styles.topContainer}>
                <View>
                    <Image style={{width: 320, height: 290}}  source={{uri:this.state.image.uri}} />
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        margin: 20,
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center'
    },
    column: {
        flex: 1,
        flexDirection: 'column',
    },
    category: {
        flex: 1,
        flexDirection: 'row'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonContainer: {
        margin: 10
    },
    alternativeLayoutButtonContainer: {
        margin: 10,
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
        paddingTop: 8,
        fontSize: 14
    }
});

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(uploadActions, dispatch)
    }
}

function mapStateToProps(state, ownProps) {

    return {
        upload: state.upload,
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload);