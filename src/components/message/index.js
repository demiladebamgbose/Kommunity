/**
 * Created by jolaadeadewale on 06/09/2017.
 */
import React from 'react';
import {Text, FlatList, ActivityIndicator, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as messageActions from '../../actions/messageActions';
import SearchDisplay from '../dashboard/helper/SearchDisplay';
import _ from 'lodash';

class Message extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            animating: true,
            searchResult: [],
            userId: this.props.user._id
        }
    }

    componentWillMount() {
        let user = this.props.user;
        let conversationList = this.props.message.conversationList;
        let previousConvos = this.props.message.previousMessages;
        let userConvos = [];

        conversationList.forEach((data)=> {
            data.participants.forEach((obj)=> {
                if(obj._id !== user._id){
                    userConvos.push(obj);
                }
            });
        });
         console.log(userConvos);
        this.setState({searchResult:userConvos, animating: false});
    }

    render () {
       return (
           <View style={styles.container}>
               <ActivityIndicator
                   animating = {this.state.animating}
                   size = "large"
                   style = {styles.activityIndicator}
               />
               <FlatList
                   data={this.state.searchResult}
                   renderItem={  ({item}) =>

                        <SearchDisplay img="" id={item._id} userId={this.state.userId}
                            other={item.name} name={item.username}
                         /> }
               />

           </View>

       )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    horizontalBox: {
        flexDirection: 'row',
        flex: 1,
        padding: 7
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 20
    }
})

/*
 <FlatList
 data={this.state.searchResult}
 renderItem={({item}) =>
 <SearchDisplay img="" id={item._id} userId={this.state.userId}
 follow={this._onFollow} unfollow={this._onUnfollow}
 following={
 this.state.kin.filter((obj)=>{
 return obj._id === item._id
 }).length
 }
 viewClicked={this._onUserView}
 other={item.name} name={item.username}
 /> }
 />
 */

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(messageActions, dispatch)
    }
}

function mapStateToProps(state, ownProps) {
    return {
        message: state.messages,
        user: state.user.presentUser
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Message);