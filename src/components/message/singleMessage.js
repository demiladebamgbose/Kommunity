
import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {GiftedChat, Actions, Bubble} from 'react-native-gifted-chat';
import CustomActions from './CustomActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/userActions';
import * as messageActions from '../../actions/messageActions';

//import CustomView from './CustomView';

class SingleMessage extends React.Component {
    constructor(props) {
        super(props);
        /*
         navigate('SingleMessage', {type: 'user', id: this.state.user || this.props.user._id,
         nav: this.state.screenProps, 'sender': this.state.id})
         */


        this.state = {
            messages: [],
            loadEarlier: true,
            typingText: null,
            isLoadingEarlier: false,
            sender: this.props.navigation.state.params.sender
        };

        this._isMounted = false;
        this.onSend = this.onSend.bind(this);
        this.onReceive = this.onReceive.bind(this);
        this.renderCustomActions = this.renderCustomActions.bind(this);
        this.renderBubble = this.renderBubble.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.onLoadEarlier = this.onLoadEarlier.bind(this);

        this._isAlright = null;
    }

    componentWillMount() {
        let obj = {'data': true};
        this.props.messages.screenShowing(obj).then( response => {

        });
        let user = {'data': this.state.sender};
        this.props.messages.currentUser(user).then( response => {

        });
        this._isMounted = true;
        this.setState(() => {
            return {
                messages: [
                    {
                        _id: Math.round(Math.random() * 1000000),
                        text: 'Yes, and I love it',
                        createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
                        user: {
                            _id: 1,
                            name: 'Developer',
                        },
                        sent: true,
                        received: true,
                        // location: {
                        //   latitude: 48.864601,
                        //   longitude: 2.398704
                        // },
                    },
                    {
                        _id: Math.round(Math.random() * 1000000),
                        text: 'Are you using Kommuniyt?',
                        createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
                        user: {
                            _id: 2,
                            name: 'Titcombe',
                        },
                    },
                ]
            };
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
        let obj = {'data': false};
        this.props.messages.screenShowing(obj).then( response => {

        });
        let user = {'data': ''};
        this.props.messages.currentUser(user).then( response => {

        });

    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.message.newMessage.message) {
            this.setState((previousState) => {
                return {
                    messages: GiftedChat.append(previousState.messages,
                        nextProps.message.newMessage.message.text),
                };
            });
        }
    }

    onLoadEarlier() {
        this.setState((previousState) => {
            return {
                isLoadingEarlier: true,
            };
        });

        setTimeout(() => {
            if (this._isMounted === true) {
                this.setState((previousState) => {
                    return {
                        messages: GiftedChat.prepend(previousState.messages, [
                            {
                                _id: Math.round(Math.random() * 1000000),
                                text: 'It uses the same design as React, letting you compose a rich mobile UI from declarative components https://facebook.github.io/react-native/',
                                createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
                                user: {
                                    _id: 1,
                                    name: 'Developer',
                                },
                            },
                            {
                                _id: Math.round(Math.random() * 1000000),
                                text: 'React Native lets you build mobile apps using only JavaScript',
                                createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
                                user: {
                                    _id: 1,
                                    name: 'Developer',
                                },
                            },
                        ]),
                        loadEarlier: false,
                        isLoadingEarlier: false,
                    };
                });
            }
        }, 1000); // simulating network
    }
    /*
     let senderId = req.body.senderId;
     let message = req.body.message;
     let userName = req.body.user.username;
     let userId = req.body.user._id;
     */
    onSend(messages = []) {
        let obj = {};
        obj.senderId = this.state.sender;
        obj.message = messages;
        obj.user = this.props.user;

        console.log(obj, 'just before sending');
        this.props.action.sendMessage(obj).then(response => {
            this.setState((previousState) => {
                return {
                    messages: GiftedChat.append(previousState.messages, messages),
                };
            });
        });

        // for demo purpose
       // this.answerDemo(messages);
    }

    answerDemo(messages) {
        if (messages.length > 0) {
            if ((messages[0].image || messages[0].location) || !this._isAlright) {
                this.setState((previousState) => {
                    return {
                        typingText: 'React Native is typing'
                    };
                });
            }
        }

        setTimeout(() => {
            if (this._isMounted === true) {
                if (messages.length > 0) {
                    if (messages[0].image) {
                        this.onReceive('Nice picture!');
                    } else if (messages[0].location) {
                        this.onReceive('My favorite place');
                    } else {
                        if (!this._isAlright) {
                            this._isAlright = true;
                            this.onReceive('Alright');
                        }
                    }
                }
            }

            this.setState((previousState) => {
                return {
                    typingText: null,
                };
            });
        }, 1000);
    }

    onReceive(text) {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, {
                    _id: Math.round(Math.random() * 1000000),
                    text: text,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        // avatar: 'https://facebook.github.io/react/img/logo_og.png',
                    },
                }),
            };
        });
    }

    renderCustomActions(props) {
        if (Platform.OS === 'ios') {
            return (
                <CustomActions
                    {...props}
                />
            );
        }
        const options = {
            'Action 1': (props) => {
                alert('option 1');
            },
            'Action 2': (props) => {
                alert('option 2');
            },
            'Cancel': () => {},
        };
        return (
            <Actions
                {...props}
                options={options}
            />
        );
    }

    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          }
        }}
            />
        );
    }

    renderCustomView(props) {
        return (
            /* <CustomView
             {...props}
             /> */
            null
        );
    }

    renderFooter(props) {
        if (this.state.typingText) {
            return (
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>
                        {this.state.typingText}
                    </Text>
                </View>
            );
        }
        return null;
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend}
                loadEarlier={this.state.loadEarlier}
                onLoadEarlier={this.onLoadEarlier}
                isLoadingEarlier={this.state.isLoadingEarlier}

                user={{
          _id: this.props.user._id, // sent messages should have same user._id
        }}

                renderActions={this.renderCustomActions}
                renderBubble={this.renderBubble}
                renderCustomView={this.renderCustomView}
                renderFooter={this.renderFooter}
            />
        );
    }
}

const styles = StyleSheet.create({
    footerContainer: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    footerText: {
        fontSize: 14,
        color: '#aaa',
    },
});

function mapStateToProps(state, ownProps) {
    return {
        user: state.user.presentUser,
        message: state.messages
    }
}

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(userActions, dispatch),
        messages: bindActionCreators(messageActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleMessage);
