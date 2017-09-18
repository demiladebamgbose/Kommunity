/**
 * Created by jolaadeadewale on 06/09/2017.
 */
import React from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as messageActions from '../../actions/messageActions';

class Message extends React.Component {
    constructor(props){
        super(props);
    }

    componentWillMount() {
        let user = this.props.user;
        this.props.action.previousMessages(user).then( response => {
            console.log(this.props.message, 'redturned');
        });
    }

    render () {
       return (
           <Text>
                Beautiful
           </Text>
       )
    }
}

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