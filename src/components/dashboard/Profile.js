import React from 'react'
import {Image, Button, Alert, View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import ProfileTab from './profile/ProfileTab';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
let {height, width} = Dimensions.get('window');
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as fileActions from '../../actions/fileActions';
import * as userActions from '../../actions/userActions';
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
            id: userIdMessage
        }
    }

    static navigationOptions = {
        tabBarLabel: 'Profile',
        // Note: By default the icon is only shown on iOS.
        tabBarIcon: ({ tintColor }) => (
            <Ionicons name="ios-person-outline" size={20} />
        ),
    };

    _onProfileClick = () => {

    };

    _onRefresh =() => {

    };

    _onKin =()=> {
        const {navigate} = this.state.screenProps;
        navigate('ViewFollowers', {type: 'kin', id: this.state.user || this.props.user._id,
            nav: this.state.screenProps})
    };

    _onFollowers =()=> {
        const {navigate} = this.state.screenProps;
        navigate('ViewFollowers', {type: 'followers', id: this.state.user || this.props.user._id,
            nav: this.state.screenProps})
    };

    componentDidMount() {
        let userId = this.state.user || this.props.user._id;
        // We want to fetch the users files for the total amount of post
        this.props.action.fetchUserFiles(userId).then( response => {
            let files = this.props.files;
            this.setState({post: (files.userFile.message.data.length)});
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
                    name: this.props.userProfile.username, id: this.props.userProfile._id});
            });
        }
    };

    _navigateToMessage =() => {
        const {navigate} = this.state.screenProps;
        navigate('SingleMessage', {type: 'user', id: this.state.user || this.props.user._id,
            nav: this.state.screenProps, 'sender': this.state.id})
    };

    _onRespondToButtonText = () => {
        switch (this.state.buttonText) {
            case 'Message': this._navigateToMessage();
            break;
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topProfile}>
                    <View style={{width: ((25 / 100) * width)}}>
                        <Circle url="https://res.cloudinary.com/dd58mfinr/image/upload/v1481734664/default.png"
                                label={this.state.name}
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
                                <TouchableOpacity style={styles.button2}>
                                    <Ionicons style={{textAlign: 'center'}} name="ios-settings-outline" size={11} />
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </View>
                <View style={styles.container}>
                    <ProfileTab screenProps={{ rootNavigation:  this.state.screenProps ,
                    userId: this.state.user , nav: this.state.rootNav }} />
                </View>
            </View>
        );
    }
}

const Circle = ({label, url, click}) => {
    return (
        <View style={styles.center}>
            <TouchableOpacity onPress={() => click(label)}>
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