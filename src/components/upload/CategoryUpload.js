/**
 * Created by jolaadeadewale on 22/08/2017.
 */
import { Constants} from 'expo';
import React from 'react';
import {View, Text, StyleSheet, TextInput, Image, Dimensions, Switch, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as uploadActions from '../../actions/uploadActions';
let {height, width} = Dimensions.get('window');
let uploader = {};


class CategoryUpload extends React.Component {

    constructor(props, context){
        super(props);
        this.state = {
            'caption': '',
            'image': this.props.upload.image,
            kommunity: true,
            kin: false,
            animating: false
        };
        uploader = this;
        const { navigate } = this.props.navigation;

    }

    static navigationOptions = ({navigation})=> {
        const {params = {}} = navigation.state;

        return {
            headerRight: <Text onPress={
            ()=> {
                uploader._onUpload();
            }
            } style={{ color: 'blue',
            marginRight: 20}}>Post</Text>
        }
    };

    _onUpload = () => {
        this.setState({animating: true});
        let image = this.state.image;
        const url = Constants.manifest.infoPlist.cloudinaryUrl;
        const uri = image;

        const obj = {
            url, uri, preset: Constants.manifest.infoPlist.preset
        };

        this.props.action.uploadFileCloud(obj).then( data=> {
            const fileUplod = this.props.upload.cloudResponse;
            const userId = this.props.user.presentUser._id;
            const status = this.state.kommunity;
            const caption = this.state.caption;

            let dataObj = {
                owner: userId,
                content: fileUplod,
                status: status,
                caption: caption,
                tags : [],
                hashtags: [],
                category:  this.props.upload.category
            };

            this.props.action.uploadFileToServer(dataObj).then( data => {
                this.setState({animating: false});
                if(this.props.upload.serverResponse) {
                    const { navigate } = this.props.navigation;
                    navigate('Landing', { user: userId })
                }

            }).catch(err => {
                console.log(err);
            });

        }).catch(err => {
            console.log(err);
        });
    };

    _onKommunity = (e) => {
        let obj = {
            kommunity: e,
            kin: !this.state.kin
        };

        this.setState(obj)
    };

    _onKin = (e) => {
        let obj = {
            kommunity: !this.state.kommunity,
            kin: e
        };

        this.setState(obj);
    };

    render() {
        return (
        <View style={styles.topContainer}>
            <ActivityIndicator
                animating = {this.state.animating}

                size = "large"
                style = {styles.activityIndicator}
            />
            <View style={styles.commentSection}>
                <TextInput
                    style={{ paddingLeft: 10, fontSize: 9,
                            height: 70,
                            backgroundColor: 'white',
                            'paddingBottom': 5, width: (width/ 1.5)

                    }}
                           multiline = {true}
                           numberOfLines = {4}
                           placeholder='Write Caption'
                           onChangeText={(text) => this.setState({'caption': text})}
                           value={this.state.caption}
                />
                <Image style={{width: ((width/ 5)), height: 70, marginRight: 5}}  source={{uri:this.state.image.uri}} />

            </View>
            <View style={styles.privateSection}>
                <View style={styles.kinSelection}>
                    <Text style={{ textAlign: 'center', fontSize: 10}}>
                        Kommunity
                    </Text>
                    <Switch
                        value={this.state.kommunity}
                        onValueChange={this._onKommunity}
                    />

                </View>
                <View style={styles.kinSelection}>
                    <Text style={{ textAlign: 'center',  fontSize: 10}}>
                        Kin
                    </Text>
                    <Switch
                        value={this.state.kin}
                        onValueChange={this._onKin}
                    />
                </View>
            </View>
            <View style={{height: 300, flex: 1}}>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    commentSection:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderStyle: 'solid',
        borderTopColor: '#ECECEC',
        borderTopWidth: 1,
        borderBottomColor: '#ECECEC',
        borderBottomWidth: 1,
        padding: 8,
        height: (height/ 7)
    },
    privateSection: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    kinSelection: {
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 5
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryUpload);