
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

class SingleMessage extends React.Component {
    constructor(props) {
        super(props);
        if(this.props.navigation.state.params.id) {
            this.state = {
                messages: [],
                conversation: this.props.navigation.state.params.id,
                loadEarlier: true,
                typingText: null,
                isLoadingEarlier: false,
                sender: this.props.navigation.state.params.sender,
                newConversation: false
            };

        }else{
            this.state = {
                messages: [],
                loadEarlier: true,
                typingText: null,
                isLoadingEarlier: false,
                sender: this.props.navigation.state.params.sender,
                newConversation: false
            };
        }


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

        if(!this.props.message.previousMessages) {
            this.setState({newConversation: true});
            this.setState(() => {
                return {
                    messages: []
                };
            });
        }

        // We want to set teh screen to showing so when new messages come in,
        // the screen showing can be set to true

        let obj = {'data': true};
        this.props.messages.screenShowing(obj).then( response => {

        });
        let user = this.state.sender;
        this.props.messages.currentUser(user).then( response => {

        });
        this._isMounted = true;
    }

    /*
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
     */

    componentWillUnmount() {

        this._isMounted = false;
        let obj = {'data': false};
        this.props.messages.screenShowing(obj).then( response => {

        });
        let user = '';
        this.props.messages.currentUser(user).then( response => {

        });

    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.message.newMessage.message) {
            console.log(this.props.message);
            this.setState((previousState) => {
                return {
                    messages: GiftedChat.append(previousState.messages,
                        nextProps.message.newMessage.message.text),
                };
            });
        }
    }

    componentDidMount () {
        if(this.props.navigation.state.params.id) {
            let user = {};
            user.conversationId = this.props.navigation.state.params.id;
            this.props.messages.
            previousConversations(user).then(resonse => {
                console.log(this.props.message.userPreviousMessage, 'check')
                this.props.message.userPreviousMessage.forEach((data)=> {
                    console.log(data);
                    this.setState({ messages: GiftedChat.append(this.state.messages, data.body)})
                })
            })
        }

    }

    onLoadEarlier() {
        this.setState((previousState) => {
            return {
                isLoadingEarlier: true,
            };
        });

        this.setState((previousState) => {
            return {
                isLoadingEarlier: false,loadEarlier: false
            };
        });

        /*setTimeout(() => {
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
                        isLoadingEarlier: false
                    };
                });
            }
        }, 1000); //simulating network
        */
    }

    onSend(messages = []) {
        messages[0].user.avatar = this.props.user.image
            || 'https://res.cloudinary.com/dd58mfinr/image/upload/v1481734664/default.png';
        let obj = {};
        obj.recipient = this.state.sender;
        obj.composedMessage = messages;
        obj.user = this.props.user;
        console.log(obj, 'just before sending');


        if(this.state.conversation && (this.state.messages.length)) {
            obj.conversationId = this.state.conversation;
            obj.author = this.props.user;
            this.props.messages.sendReply(obj).then(response => {
                console.log(this.props.message, ' back from message');
                this.setState((previousState) => {
                    return {
                        messages: GiftedChat.append(previousState.messages, messages),
                    };
                });
            });
        }else {
            if (this.state.messages.length) {

            } else {
                this.props.action.sendMessage(obj).then(response => {
                    console.log(this.props.userStatus.messageStatus, ' send message');
                    this.setState((previousState) => {
                        return {
                            conversation: this.props.userStatus.messageStatus,
                            messages: GiftedChat.append(previousState.messages, messages)
                        };
                    });

                    console.log('let us see the present state', this.state)
                });
            }
        }

        // for demo purpose in gifted chat
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

    typingMessage = (text) => {
       // This shoudl be used to send is typing message
    };

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
                onInputTextChanged={this.typingMessage}
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
        message: state.messages,
        userStatus: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(userActions, dispatch),
        messages: bindActionCreators(messageActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleMessage);
