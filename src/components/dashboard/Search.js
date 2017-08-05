import React from 'react'
import {Image, Button, StyleSheet, View, TextInput, Text, FlatList} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/userActions';

class Search extends React.Component {

    constructor(props){
        super(props);
    }

    static navigationOptions = {
        tabBarLabel: 'Search',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
            <EvilIcons name="search" size={20}  />
        ),
    };

    _onSearch = (text) => {
        let that = this;

        this.props.action.searchUser(text).then( response => {
            let userResponse = that.props.user;
            console.log(userResponse);
        });

    };

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
                </View>
                <View style={styles.containerDropDown}>
                    <FlatList
                        data={[
                            {key: 'Devin'},
                            {key: 'Jackson'},
                            {key: 'James'},
                            {key: 'Joel'},
                            {key: 'John'},
                            {key: 'Jillian'},
                            {key: 'Jimmy'},
                            {key: 'Julie'},
                          ]}
                        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
                    />

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
