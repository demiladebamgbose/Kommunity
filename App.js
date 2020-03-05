import React from 'react';
import Login from './src/components/user/Login';
import SignUp from './src/components/user/SignUp';
import Upload from './src/components/upload/index';
import SingleView from './src/components/tabs/SingleViewTab';
import LoginTab from './src/components/user/TabSignUp';
import UserLikes from './src/components/dashboard/profile/likes/UserLikesIndex';
import ViewUser from './src/components/dashboard/profile/views/ViewUserDisplay';
import Profile from './src/components/dashboard/Profile';
import Message from './src/components/message';
import SingleMessage from './src/components/message/singleMessage';
import Events from './src/components/dashboard/activity/index';
import Landing from './src/components/dashboard/helper/drawer';
import ForgotPassword from './src/components/user/ForgotPassword';
import {Provider} from 'react-redux';
import configureStore from './src/store/ConfigureStore';

import {
    StackNavigator,
} from 'react-navigation';

const store = configureStore();

const Route = StackNavigator({
    Home: { screen: Login },
    SignUp: { screen: SignUp },
    Landing: { screen: Landing},
    UploadView: {screen: Upload},
    SingleView: {screen: SingleView},
    LoginTab: {screen: LoginTab},
    UserLikes: {screen: UserLikes},
    ViewFollowers: {screen: ViewUser},
    UserProfileView: {screen: Profile},
    Message: {screen: Message},
    Events: {screen: Events},
    SingleMessage: {screen: SingleMessage},
    ForgotPassword: {screen: ForgotPassword}
});

const App = () => (
  <Provider store={store} >
      <Route/>
  </Provider>
);


export default App;
