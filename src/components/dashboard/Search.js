import React from 'react'
import {Image, Button, StyleSheet, View, TextInput, Text, FlatList, ActivityIndicator} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/userActions';
import SearchDisplay from './helper/SearchDisplay';

class Search extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            searchResult: [],
            animating: false,
            userId: this.props.user.presentUser._id,
            kin: this.props.user.presentUser.kin
        };
    }

    static navigationOptions = {
        tabBarLabel: 'Search',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
            <EvilIcons name="search" size={20}  />
        ),
    };

    _onSearch = (text) => {
        this.setState({animating: true});

        this.props.action.searchUser(text).then( response => {
            let userResponse = this.props.user;
            let users = userResponse.searchUsers.user;
            this.setState({searchResult: users});
            this.setState({animating: false});
        });
    };

    _onFollow = () => {

    };

    _onUnfollow = () => {

    };

    _onUserView = (e) => {
        const {navigate} = this.props.screenProps.rootNavigation;
        navigate('UserProfileView', { user: e, navigation: this.props.screenProps.rootNavigation});
    };

    _keyExtractor = (item, index) => index;

    render() {
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
                        keyExtractor={this._keyExtractor}
                        renderItem={({item}) =>
                        <SearchDisplay img={item.image} id={item._id} userId={this.state.userId}
                            follow={this._onFollow} unfollow={this._onUnfollow}
                            following={
                               this.state.kin.filter((obj)=>{
                                    return obj._id === item._id
                                }).length
                            }
                            viewClicked={this._onUserView}
                            other={item.name} name={item.username}
                         /> }
                        /> : <Text style={{margin: 20, fontSize: 12}}>No Result found</Text>
                    }

                </View>

            </View>
        );
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
        action: bindActionCreators(userActions, dispatch)
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
