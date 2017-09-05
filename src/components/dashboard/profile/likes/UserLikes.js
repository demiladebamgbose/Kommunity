/**
 * Created by jolaadeadewale on 01/09/2017.
 */
import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet, TextInput, FlatList} from 'react-native';
import {EvilIcons} from '@expo/vector-icons';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as fileActions from '../../../../actions/fileActions';
import * as userActions from '../../../../actions/userActions';
import SearchDisplay from '../../helper/SearchDisplay';
import _ from 'lodash';

class UserLikes extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.screenProps.id,
            searchResult: [],
            animating: true,
            userId: this.props.user._id ,
            kin: this.props.user.kin
        };
    }

    _onSearch = (text) => {
        if(!text){
            this.setState({searchResult: this.props.fileLikers});
            return;
        }

        let userInput = new RegExp('(' + text+ ')', 'gi');
        let foundElements = this.props.fileLikers.filter(obj => {

            return  userInput.test(obj.username) ||
                    userInput.test(obj.name.firstName) ||
                    userInput.test(obj.name.lastName) ||
                    userInput.test(obj.name.firstName + ' '+ obj.name.lastName) ||
                userInput.test(obj.name.lastName + ' '+ obj.name.firstName)
        });

        this.setState({searchResult: foundElements});
    };

    componentWillMount () {
        this.props.action.userLikedFiles(this.state.id).then(response => {
            this.setState({searchResult:this.props.fileLikers});
            this.setState({animating: false});
        });
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

    _onUserView = (e) => {
        const { navigate } = this.props.navigation;
        navigate('UserProfile', { user: e, navigation: this.props.screenProps.rootNavigation})
    };

    render () {
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
                                } img="" viewClicked={this._onUserView} other={item.name} name={item.username}/> }
                            /> : <Text style={{margin: 20, fontSize: 12}}>No Result found</Text>
                    }

                </View>

            </View>
        )
    }

    componentDidMount() {

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
        fileLikers: state.files.likers
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLikes);