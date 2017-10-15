/**
 * Created by jolaadeadewale on 12/10/2017.
 */
import React from 'react'
import {View, Text,  Dimensions, FlatList} from 'react-native';
import _ from 'lodash';
import Grid from '../helper/grid';
import VerticalGrid from '../helper/verticalGrid';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as eventActions from '../../../actions/eventActions';
let {height, width} = Dimensions.get('window');
let pictureSize = ((33 / 100) * width);

class Display extends React.Component {

    state = {
        events: []
    };

    componentWillMount() {
        this.props.action.getEvents().then( response => {
            let  gridImages = _.chunk(this.props.event, 3);
            this.setState({events: gridImages});
        })
    }

    _onOptions = () => {

    };

    _onImage = () => {

    };

    render () {
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={this.state.events}
                    renderItem={({item}) =>
                 <VerticalGrid obj={item} click={this._onImage}
                    width={pictureSize}
                     userLike={this._onImage} like={this._onImage} uid={1}
                     options={this._onOptions}
                     />
                 }
                />
            </View>
        )
    }
};

function mapStateToProps(state, ownProps) {
    return {
        user: state.user.presentUser,
        event: state.events.events
    }
}

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(eventActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Display);