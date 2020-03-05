import React from 'react'
import { Image, Button, Alert, View, Text, StyleSheet, TouchableOpacity, Dimensions, Modal, TouchableHighlight, ScrollView} from 'react-native';
import ProfileTab from './profile/ProfileTab';
import { ImagePicker,
    Permissions,
} from 'expo';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
let {height, width} = Dimensions.get('window');
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as fileActions from '../../actions/fileActions';
import * as userActions from '../../actions/userActions';
import EditProfile from './helper/EditProfile'
import _ from 'lodash';


class Profile extends React.Component {

    constructor(props){
        super(props);
        let id = '';
        let rootNav = '';
        let followers = 0;
        let kin = 0;
        let screenProps = '';
        let buttonText = 'Loading ...';
        let name = '';
        let userIdMessage = '';

        // This is when profile is shown from a state that is not the current users
        if(this.props.navigation.state.params) {
             id = this.props.navigation.state.params.user;
             rootNav = this.props.navigation.state.params.navigation
        } else{
            // The profile here belongs to the user
            id = this.props.user._id;
            followers = this.props.user.followers.length;
            kin = this.props.user.kin.length;
            name = this.props.user.username;
            userIdMessage = this.props.user._id;
        }

        // This is gotten from when Profile.js is called when transition is from kins or followers
        if(this.props.screenProps){
            screenProps = this.props.screenProps.rootNavigation;
        }else{
            screenProps = this.props.navigation.state.params.navigation;
        }


        // This checks to see if the user is the current user
        if(id === this.props.user._id) {
            buttonText = 'Edit Profile';
        }

        this.state = {
            user: id,
            rootNav: rootNav,
            post: 0,
            followers: followers,
            kin: kin,
            screenProps: screenProps,
            buttonText,
            name,
            id: userIdMessage,
            image: false,
            modalVisible:false,
            userImage: '',
            hasCameraPermission: false
        }
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    static navigationOptions = {
        tabBarLabel: 'Profile',
        // Note: By default the icon is only shown on iOS.
        tabBarIcon: ({ tintColor }) => (
            <Ionicons name="ios-person-outline" size={20} />
        ),
    };

    _onProfileClick = (id) => {
        // This should only work if we are on the user's Profile
        if(id === this.props.user._id) {
            this._cameraRoll();
        }
    };

    _toggleModal = (toggleState) => {
      this.setState({ modalVisible: toggleState });
    };

    _onRefresh =() => {

    };

    _onKin =()=> {
        if (this.state.kin === 0)
          return;

        const {navigate} = this.state.screenProps;
        navigate('ViewFollowers', {type: 'kin', id: this.state.user || this.props.user._id,
            nav: this.state.screenProps})
    };

    _onFollowers =()=> {
      if (this.state.followers === 0)
        return;

        const {navigate} = this.state.screenProps;
        navigate('ViewFollowers', {type: 'followers', id: this.state.user || this.props.user._id,
            nav: this.state.screenProps})
    };

    componentDidMount() {
        let userId = this.state.user || this.props.user._id;
        // We want to fetch the users files for the total amount of post
        this.props.action.fetchUserFiles(userId).then( response => {
            let files = this.props.files;
            this.setState({post: (files.userFile.message.data.length), image: true});
        });

        // We want to fetch the users kins and followers
        if(this.props.navigation.state.params) {
            this.props.userAction.findUser(this.state.user).then( response => {
                let buttonText = 'Follow';
                let foundElement = _.find(this.props.user.kin, {'_id': this.props.userProfile._id});
                if(foundElement){
                    buttonText = 'Message';
                }
                this.setState({followers: this.props.userProfile.followers.length,
                    kin: this.props.userProfile.kin.length, buttonText,
                    name: this.props.userProfile.username, id: this.props.userProfile._id,
                    userImage: this.props.userProfile.image ||
                    'https://res.cloudinary.com/dd58mfinr/image/upload/v1481734664/default.png'});
            });
        };
    };

    _navigateToMessage = () => {
        const {navigate} = this.state.screenProps;
        navigate('SingleMessage', {type: 'user', id: this.state.user || this.props.user._id,
            nav: this.state.screenProps, 'sender': this.state.id})
    };

    _navigateToEditProfile = () => {
        this._toggleModal(true);
    };

    _followUser = () => {

    };

    _onSetting = () => {
        const {navigate} = this.props.navigation;
        navigate('Settings', {});
    };

    _onSubmitEdit = () => {
        this._toggleModal(false);
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

    _onRespondToButtonText = () => {
        switch (this.state.buttonText) {
            case 'Message': this._navigateToMessage();
            break;
            case 'Edit Profile': this._navigateToEditProfile();
            break;
            case 'Follow': this._followUser();
            break;
            default: return;
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topProfile}>
                    <View style={{width: ((25 / 100) * width)}}>
                        <Circle url={ this.state.userImage ||
                                    this.props.user.image ||
                                    "https://res.cloudinary.com/dd58mfinr/image/upload/v1481734664/default.png"}
                                label={this.state.name}
                                id={this.state.id}
                                click={this._onProfileClick}
                        />
                    </View>
                    <View style={{flex: 0, flexDirection: 'column',  marginLeft: 5, marginRight: 5,
                        marginTop:8}}
                    >
                        <View style={{flex: 1, flexDirection: 'row',
                                alignContent: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 4, marginTop: 4
                               }}
                        >
                                <View style={{width: ((20 / 100) * width)}}>
                                    <Text style={{textAlign: 'center', fontSize: 10}}>{this.state.post}</Text>
                                    <Text style={{textAlign: 'center', fontSize: 11}}>Post</Text>
                                </View>

                                <View style={{width: ((30 / 100) * width)}}>
                                    <TouchableOpacity onPress={this._onFollowers}>
                                        <View>
                                            <Text style={{textAlign: 'center', fontSize: 10}}>{this.state.followers}</Text>
                                            <Text style={{textAlign: 'center',  fontSize: 11}}>followers</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{width: ((20 / 100) * width)}}>
                                    <TouchableOpacity onPress={this._onKin}>
                                        <View>
                                            <Text style={{textAlign: 'center', fontSize: 10}}>{this.state.kin}</Text>
                                            <Text style={{textAlign: 'center',  fontSize: 11}}>Kin</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row',
                                alignContent: 'center',
                                justifyContent: 'space-between', marginTop: 4, marginBottom: 4}}
                        >
                            <View style={{width: ((50 / 100) * width)}}>
                                <TouchableOpacity onPress={this._onRespondToButtonText} style={styles.button}>
                                    <Text style={{fontSize: 11, textAlign: 'center'}}>
                                        {this.state.buttonText}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{width: ((20 / 100) * width), marginLeft: 2}}>
                                <TouchableOpacity onPress={this._onSetting} style={styles.button2}>
                                    <Ionicons style={{textAlign: 'center'}} name="ios-settings-outline" size={11} />
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </View>

                <View style={styles.container}>
                {( this.state.image && (this.state.post <= 0)) ?
                      <View style={{ padding: 10,justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', height: ((70 / 100) * height)}}>
                      <Image style={{width:100 , height: 100 }}
                              source={require("./../../images/no-photo.png")}
                      />
                      <Text style={{textAlign: 'center'}}>Share your first photo</Text>
                      </View>

                  :   <ProfileTab screenProps={{ rootNavigation:  this.state.screenProps , userId: this.state.user , nav: this.state.rootNav }} /> }
                </View>

                <Modal animationType="slide" transparent={false} visible={this.state.modalVisible} onRequestClose={() => {alert("Modal has been closed.")}}>
                     <View>
                         <View style={styles.editModalTop}>
                             <TouchableOpacity onPress={() => { this._toggleModal(!this.state.modalVisible) }}>
                                 <Text style={{textAlign: 'left', padding: 12, fontSize: 20 }}>Cancel</Text>
                             </TouchableOpacity>
                             <Text style={{textAlign: 'center', padding: 12, fontSize: 20, fontWeight: 'bold',   }}>Edit Profile</Text>

                              <View style={{width:((20 / 100) * width)}}>
                                  <TouchableOpacity onPress={this._onSubmitEdit}>
                                    <Text style={{textAlign: 'right', padding: 12, fontSize: 20 }}>Done</Text>
                                  </TouchableOpacity>
                              </View>
                         </View>

                        <ScrollView>
                            <View style={{ paddingTop: 15, backgroundColor: '#f3f3f3'}}>

                                  <EditProfile />
                                  </View>

                              </ScrollView>
                     </View>
                </Modal>

            </View>
        );
    }
}

const Circle = ({label, url, click, id}) => {
    return (
        <View style={styles.center}>
            <TouchableOpacity onPress={() => click(id)}>
                <View style={styles.circle}>
                    <Image  style={{width: 50, height: 50, borderRadius: 50/2,}}
                            source={{ uri: url} }
                    />
                </View>
            </TouchableOpacity>
            <Text style={styles.text}>{label}</Text>
        </View>
     )
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    userProfile: {
        flex: 1,
        flexDirection: 'row'
    },
    topProfile: {
        flex: 0,
        flexDirection: 'row',
        marginLeft: 5,
        marginRight: 5,
        marginTop:8,
        height: (height/ 8)
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 50/2,
        marginRight: 6
    },
    center: {

    },
    text: {
        marginTop: 2,
        fontSize: 8,
    },
    button2: {
        width: (((10 / 100) * width)),
        marginTop: 2,
        paddingTop: 4,
        paddingBottom: 4,
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: '#D3D3D3',
        borderWidth: 1,
        borderStyle: 'solid',
        alignContent: 'center'
    },
    button: {
        marginTop: 2,
        paddingTop: 3,
        paddingBottom: 3,
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: '#D3D3D3',
        borderWidth: 1,
        borderStyle: 'solid',
    },
    editModalTop: {
          borderColor: '#D3D3D3',
          borderWidth: 1,
          borderStyle: 'solid',
          paddingTop: 25,
          backgroundColor: '#f3f3f3',
          flexDirection: 'row',
          height:((12 / 100) * height),
        justifyContent: 'space-between'
    }
});

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(fileActions, dispatch),
        userAction: bindActionCreators(userActions, dispatch)
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.user.presentUser,
        files: state.files,
        userProfile: state.user.userProfile
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
