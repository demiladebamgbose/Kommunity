/**
 * Created by jolaadeadewale on 29/07/2017.
 */
import React from 'react';
import {View, Text, Image, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as fileActions from '../../../actions/fileActions';
import VerticalGrid from '../../dashboard/helper/verticalGrid';
import _ from 'lodash';

class ProfileSingleView extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            files: []
        }
    }

    static navigationOptions = {
        tabBarLabel: '',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
            <Ionicons
                name="ios-list"
                size={22}
            />
        ),
    };

    _onClick = (e) => {

        let that = this;
        let files = that.props.files;
        let singleViewImage = _.find(files.recent.message.data, ['_id', e]);

        this.props.action.fetchSingleFileView(singleViewImage).then( response => {

            const { navigate } = that.props.navigation;
            navigate('SingleView', { image: '' })
        });

    };

    render () {
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={this.state.files}
                    renderItem={({item}) => <VerticalGrid obj={item} click={this._onClick} />}
                />
            </View>
        )
    }

    componentDidMount () {

        let that = this;
        let userId = this.props.user.presentUser.message.user._id;
        console.log('disptached at ', userId);
        this.props.action.fetchUserFiles(userId).then( response => {

            let files = that.props.files;
            let gridImages = _.chunk(files.userFile.message.data, 1);
            this.setState({files: gridImages});
        });
    }

}

const Circle = ({label, url, click}) => {
    return (
        <View style={styles.center}>
            <TouchableOpacity onPress={() => click(label)}>
                <View style={styles.circle}>
                    <Image  style={{width: 50, height: 50, borderRadius: 50/2,}}
                            source={{ uri: url} } />
                </View>
            </TouchableOpacity>
            <Text style={styles.text}>{label}</Text>
        </View>
    )
};


const styles = StyleSheet.create({
    circle: {
        width: 50,
        height: 50,
        borderRadius: 50/2,
        marginRight: 6
    },
    center: {

    },
    text: {
        marginTop: 2,
        fontSize: 8,
    }
});

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(fileActions, dispatch)
    }
}

function mapStateToProps(state, ownProps) {
    return {
        files: state.files,
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSingleView);