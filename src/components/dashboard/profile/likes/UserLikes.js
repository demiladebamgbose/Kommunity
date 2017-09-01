/**
 * Created by jolaadeadewale on 01/09/2017.
 */
import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as fileActions from '../../../../actions/fileActions';

class UserLikes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.screenProps.id
        };

    }

    render () {
        return (
            <View>
                <Text>
                    I work
                </Text>
            </View>
        )
    }

    componentDidMount() {
    }

}

const styles = StyleSheet.create({

    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    }
});

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(fileActions, dispatch)
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.user.presentUser,
        files: state.files
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLikes);