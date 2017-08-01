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
        screen: EmailTab,
    },
    NumberTab: {
        screen: NumberTab,
    }
}, {
    tabBarOptions: {
        activeTintColor: '#000000',
        showLabel: true
    },
    tabBarPosition: 'top'
});

export default TabSignUp;
