/**
 * Created by jolaadeadewale on 05/09/2017.
 */
import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet, TextInput, FlatList} from 'react-native';
import {EvilIcons} from '@expo/vector-icons';
import {connect} from 'react-redux';
import SearchDisplay from '../../helper/SearchDisplay';
import _ from 'lodash';
import {bindActionCreators} from 'redux';
import * as fileActions from '../../../../actions/fileActions';
import * as userActions from '../../../../actions/userActions';

class Followers extends React.Component {

    constructor(props){
        super(props);
        let type = '';
        let followers = '';
        let kin = '';
        let searchResult = [];
        // The logged in User
        if(this.props.screenProps.id === this.props.user._id) {
            if (this.props.screenProps.type === 'followers') {
                type= 'USER_FOLLOWER';
                followers = this.props.user.followers;
                searchResult  = this.props.user.followers;
                kin = this.props.user.kin;
            }else{
                type= 'USER_KIN';
                followers = this.props.user.followers;
                searchResult  = this.props.user.kin;
                kin = this.props.user.kin;
            }
        } else{
            // We need to fetch the user
            if (this.props.screenProps.type === 'followers') {
                type= 'USER_SEARCH_FOLLOWER';
            }else{
                type = 'USER_SEARCH_KIN'
            }
        }

        this.state = {
            id: this.props.screenProps.id,
            searchResult: searchResult,
            animating: true,
            userId: this.props.user._id ,
            kin: kin,
            followers: followers,
            type: type
        };

    }

    _onUserView = (e) => {
        const { navigate } = this.props.screenProps.nav;
        navigate('UserProfileView', { user: e,
            navigation: this.props.screenProps.rootNavigation ||
            this.props.screenProps.nav
        })
    };

    _getSearchVariable = ()=> {
        switch(this.state.type) {
            case 'USER_FOLLOWER': return this._userProfileFollowersSearch();
                break;
            case 'USER_KIN': return this._userProfileKinSearch();
                break;
            case 'USER_SEARCH_FOLLOWER': return this._userSearchFollowerSearch();
                break;
            case  'USER_SEARCH_KIN': return this._userSearchKinSearch();
                break;
        }
    };

    _onSearch = (text) => {

        let searchData = this._getSearchVariable();

        if(!text){
            this.setState({searchResult: searchData});
            return;
        }

        let userInput = new RegExp('(' + text+ ')', 'gi');
        let foundElements = searchData.filter(obj => {

            return  userInput.test(obj.username) ||
                userInput.test(obj.name.firstName) ||
                userInput.test(obj.name.lastName) ||
                userInput.test(obj.name.firstName + ' '+ obj.name.lastName) ||
                userInput.test(obj.name.lastName + ' '+ obj.name.firstName)
        });

        this.setState({searchResult: foundElements});
    };

    _userProfileFollowersSearch = () => {
       return this.props.user.followers;
    };

    _userProfileFollowers = () => {
       this.setState({animating: false});
    };

    _userProfileKinSearch = () => {
        return this.props.user.kin;
    };

    _userProfileKin = () => {
        this.setState({animating: false});
    };

    _userSearchFollowerSearch =() => {
        return this.props.userProfile.followers;
    };

    _userSearchFollower =() => {
        this.props.userAction.findUser(this.state.id).then(response => {
             this.setState({searchResult:
                this.props.userProfile.followers, animating: false, kin: this.props.userProfile.followers
             });
         });
    };

    _userSearchKinSearch = () => {
        return  this.props.userProfile.kin;
    };

    _userSearchKin = () => {
        this.props.userAction.findUser(this.state.id).then(response => {
             this.setState({searchResult:
                this.props.userProfile.kin, animating: false, kin: this.props.userProfile.followers
             });
         });
    };

    componentWillMount () {
        switch(this.state.type) {
            case 'USER_FOLLOWER': this._userProfileFollowers();
            break;
            case 'USER_KIN': this._userProfileKin();
            break;
            case 'USER_SEARCH_FOLLOWER': this._userSearchFollower();
            break;
            case  'USER_SEARCH_KIN': this._userSearchKin();
            break;
        }
    }

    _onFollow = (e) => {
        let user = _.find(this.state.searchResult, ['_id', e]);
        const presentUser = this.props.user;
        let userObj = {
            follower: presentUser,
            user
        };

        this.props.userAction.followUser(userObj).then( response => {

        });
    };

    _onUnfollow = (e) => {
        let user = _.find(this.state.searchResult, ['_id', e]);
        const presentUser = this.props.user;
        let userObj = {
            unfollow: presentUser,
            user
        };

        this.props.userAction.unFollowUser(userObj).then( response => {

        });
    };

    render(){
        return (
            <View style={styles.container}>
                <View style={[styles.centerContent]}>
                    <View style={styles.textBox}>
                        <View style={styles.horizontalBox}>
                            <Text style={[styles.textCenter, {color: '#3B5998'}]}>
                                <EvilIcons name="search" size={15}  />
                            </Text>

                            <View style={styles.separator}></View>

                            <TextInput
                                style={{
                                    fontSize: 14, height: 30,  fontFamily: 'Arial',
                                    width: 250, backgroundColor: '#E5E5E5', paddingBottom: 1, marginLeft: 4
                                }}
                                onChangeText={this._onSearch}
                                placeholder='Search'
                            />
                        </View>
                    </View>
                    <ActivityIndicator
                        animating = {this.state.animating}
                        size = "large"
                        style = {styles.activityIndicator}
                    />
                </View>
                <View style={styles.containerDropDown}>
                    {
                        (this.state.searchResult.length) ?
                            <FlatList
                                data={this.state.searchResult}
                                extraData={this.state}
                                renderItem={({item}) => <SearchDisplay id={item._id} userId={this.state.userId}  follow={this._onFollow} unfollow={this._onUnfollow}
                                following={
                                    this.state.kin.filter((obj)=>{
                                        return obj._id === item._id
                                    }).length
                                }
                            img={item.image} viewClicked={this._onUserView} other={item.name} name={item.username}/> }
                            /> : <Text style={{margin: 20, fontSize: 12}}>No Result found</Text>
                    }

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
        marginBottom: 5
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
    },containerDropDown: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 20
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
        userProfile: state.user.userProfile
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Followers);