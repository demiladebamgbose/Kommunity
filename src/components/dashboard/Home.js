import React from 'react'
import {Image, Button, Alert,  CameraRoll, StyleSheet, View, FlatList, Text, ScrollView, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as fileActions from '../../actions/fileActions';
import _ from 'lodash';
import Circle from '../dashboard/helper/Circle';
let {height, width} = Dimensions.get('window');
import { Ionicons } from '@expo/vector-icons';
import PostTab from './postTab/PostTab';
let pictureSize = ((33 / 100) * width)

class Home extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            'photos': {},
            'files': [],
            'private': []
        };

        this._onCamera = this._onCamera.bind(this);
    }

    static navigationOptions = {
        tabBarLabel: 'Home',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
            <Ionicons name="ios-home-outline" size={20}  />
        ),
    };

    _onCamera =() => {

    };

    _onCategory = (e) => {
        let files = this.props.files;

        let privateFiles =  _.filter(files.recent.message.data, (obj)=>{
            if(obj.category[e])
                return obj.category[e] === true && obj.status == 'false';
        });
        privateFiles = _.chunk(privateFiles, 3);
        this.setState({private: privateFiles});

        let gridImages =  _.filter(files.recent.message.data, (obj)=>{
            return obj.category[e] === true && obj.status == 'true';
        });
        gridImages = _.chunk(gridImages, 3);
        this.setState({files: gridImages});
    };

    _onClick = (e) => {
        let that = this;
        let files = that.props.files;
        let singleViewImage = _.find(files.recent.message.data, ['_id', e]);
        this.props.action.fetchSingleFileView(singleViewImage).then( response => {
            const { navigate } =  this.props.screenProps.rootNavigation;
            navigate('SingleView', { image: '' })
        });

    };

    render() {

        return (
             <View style={{flex: 1, flexDirection: 'column',  justifyContent: 'space-between'}}>
                 <View style={{height: (height / 5)}}>
                    <ScrollView showsHorizontalScrollIndicator={false} style={styles.scrollViewStyle} horizontal={true} >
                    <View style={styles.categoryHeight}>
                        <Circle
                            click={this._onCategory}
                            url="http://res.cloudinary.com/dd58mfinr/image/upload/v1503765729/4633036-fashion-image_yl3aot.jpg"
                            label="Fashion"
                        />
                        <Circle
                            click={this._onCategory}
                            url="http://res.cloudinary.com/dd58mfinr/image/upload/v1503768615/restaurant-939435_960_720_obutlg.jpg"
                            label="Restaurant"
                        />
                        <Circle
                            click={this._onCategory}
                            url="http://res.cloudinary.com/dd58mfinr/image/upload/v1503768788/download_1_p3rfhz.jpg"
                            label="hangout"
                        />
                        <Circle
                            click={this._onCategory}
                            url="http://res.cloudinary.com/dd58mfinr/image/upload/v1503768715/download_kf8kfc.jpg"
                            label="Events"
                        />
                        <Circle
                            click={this._onCategory}
                            url="http://res.cloudinary.com/dd58mfinr/image/upload/v1503768912/Wonder-Paris-Eiffel-Tower-Travel-Images_shwxpp.jpg"
                            label="Travels"/>
                        <Circle
                            click={this._onCategory}
                            url="http://res.cloudinary.com/dd58mfinr/image/upload/v1503768995/images_ru3web.jpg"
                            label="Arts"
                        />
                    </View>
                    </ScrollView>
                 </View>

                 <View style={styles.pictureContainer}>
                    <PostTab
                        screenProps={{data: this.state.files, width: pictureSize, click: this._onClick,
                        privateData: this.state.private}}
                        data={this.state.files} width={pictureSize} click={this._onClick} />
                </View>
            </View>
        );
    }

    componentDidMount () {
        let that = this;
        this.props.action.fetchAllFiles().then( data => {
            let files = that.props.files;

            let privateFiles = _.filter(files.recent.message.data, ['status', 'false']);
            privateFiles = _.chunk(privateFiles, 3);
            this.setState({private: privateFiles});

            let gridImages = _.chunk(files.recent.message.data, 3);
            this.setState({files: gridImages});
        });
    }
}

const styles = StyleSheet.create({
    wrapper:{
        flex: 1,
    },
    row:{
        flexDirection: 'row',
        flex: 1,
    },
    marker: {
        position: 'absolute',
        top: 5,
        backgroundColor: 'transparent',
    },
    categoryHeight: {
        height: (height/ 8),
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flex: 1
    },
    scrollViewStyle:{
        borderBottomColor: '#e6e6e6',
        borderBottomWidth: 1,
        marginTop: 15,
        flex: 1
    },
    pictureContainer: {
        flex: 1,
    }
});

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(fileActions, dispatch)
    }
}

function mapStateToProps (state, ownProps) {
    return {
        files: state.files
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
