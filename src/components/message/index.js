/**
 * Created by jolaadeadewale on 06/09/2017.
 */
import React from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';

class Message extends React.Component {
    constructor(props){
        super(props);
    }

    render () {
       return (
           <Text>
                Beautiful
           </Text>
       )
    }
}

export default connect(null, null)(Message);