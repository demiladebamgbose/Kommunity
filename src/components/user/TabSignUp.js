/**
 * Created by jolaadeadewale on 29/07/2017.
 */

import React from 'react';
import EmailTab from './EmailTab';
import NumberTab from './PhoneNumberTab';


import {
    TabNavigator,
} from 'react-navigation';

const TabSignUp = TabNavigator({

    EmailTab: {
        screen: EmailTab
    },
    NumberTab: {
        screen: NumberTab,
    }
}, {
    tabBarOptions: {
        activeTintColor: '#000000',
        showLabel: true,
        labelStyle: {fontSize: 16, fontFamily: 'Arial-BoldMT'},
        indicatorStyle: {
            borderBottomColor: '#000000',
            borderBottomWidth: 2,
        }
    },
    tabBarPosition: 'top',
    animationEnabled: true
});

export default TabSignUp;
