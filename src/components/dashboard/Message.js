/**
 * Created by jolaadeadewale on 04/08/2017.
 */
import React from 'react';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

class Message extends React.Component {

    constructor(props){
        super(props);
    }

    _onMessageView = () => {
        const {navigate} = this.props.screenProps.rootNavigation;
        navigate('Message', {user: '', root: this.props.screenProps.rootNavigation});
    };

 render() {
     return (
         <TouchableOpacity onPress={this._onMessageView} style={styles.message}>
             <FontAwesome name="envelope-o" size={18}/>
         </TouchableOpacity>
     )
 }
};

const styles = StyleSheet.create({

    message:{
        marginRight: 15
    }
});

export default Message;