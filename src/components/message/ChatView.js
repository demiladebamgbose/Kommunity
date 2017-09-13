/**
 * Created by jolaadeadewale on 09/09/2017.
 */
/*import React from 'react';
import {View, Text, Image, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
const {width, height} = Dimensions.get('window');

const ChatView = ({message, sender}) => {
    return (
        <View style={{margin: 5,  width: ((65 / 100) * width), flexDirection: 'column', alignItems: (sender) ? 'flex-start': 'flex-end'}}>
            <TouchableOpacity style={{
            marginTop: 4,
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 5,
            paddingRight: 5,
            borderRadius: 7,
            backgroundColor: (sender) ? 'white': '#d3d3d3', borderColor: 'grey',
            borderWidth: 1,
            borderStyle: 'solid',
              }}>
            <Text style={{ fontSize: 10}}>
                {message}
            </Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    button: {
        marginTop: 2,
        paddingTop: 3,
        paddingBottom: 3,
        backgroundColor: 'white',
        borderRadius: 7,
        borderColor: '#D3D3D3',
        borderWidth: 1,
        borderStyle: 'solid',
    }
});

export default ChatView; */

import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {GiftedChat, Actions, Bubble} from 'react-native-gifted-chat';
import CustomActions from './CustomActions';
//import CustomView from './CustomView';

 class ChatView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            loadEarlier: true,
            typingText: null,
            isLoadingEarlier: false,
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
        this._isMounted = true;
        this.setState(() => {
            return {
                messages: [
                    {
                        _id: Math.round(Math.random() * 1000000),
                        text: 'Yes, and I use Gifted Chat!',
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
                        text: 'Are you building a chat app?',
                        createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
                        user: {
                            _id: 2,
                            name: 'React Native',
                        },
                    },
                ]
            };
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
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

    onSend(messages = []) {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, messages),
            };
        });

        // for demo purpose
        this.answerDemo(messages);
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
          _id: 1, // sent messages should have same user._id
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

 export default ChatView;