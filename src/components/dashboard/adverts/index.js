/**
 * Created by jolaadeadewale on 10/10/2017.
 */
import React from 'react';
import {Image, Button, Alert, View, Text, FlatList, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import _ from 'lodash'
import {bindActionCreators} from 'redux';
import * as eventActions from '../../../actions/eventActions';
import Grid from '../helper/grid';
let {height, width} = Dimensions.get('window');
let pictureSize = ((22 / 100) * width);
class Advert extends React.Component {



    constructor(props){
        super(props);
        this.state = {
            events: []
        }
    }

    componentWillMount() {
        this.props.action.getEvents().then( res => {
            console.log('----->', this.props.event)
            let  gridImages = _.chunk(this.props.event, 3);
            this.setState({events: gridImages});
        });
    }

    _onChangeView = () => {
        Alert.alert('BBC', 'News outreaching media for likes and hates');
    };

    render () {
        return (
            <View style={{flex: 1, paddingTop: 5}}>
                <View>
                    <Text style={{textAlign: 'center'}}>Sponsors</Text>
                </View>
                <View>
                <FlatList
                    data={this.state.events}
                    renderItem={({item}) =>
                 <Grid obj={item}
                    click={this._onChangeView}
                    width={pictureSize}
                    margin={7}
                    />
                 }
                />
                </View>
            </View>
        );
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Advert)