import React from 'react';
import Login from './src/components/user/Login';
import SignUp from './src/components/user/SignUp';
import Dashboard from './src/components/dashboard/landingPage';
import Upload from './src/components/upload/index';
import SingleView from './src/components/tabs/SingleViewTab';
import LoginTab from './src/components/user/TabSignUp';
import UserLikes from './src/components/dashboard/profile/likes/UserLikesIndex';
import ViewUser from './src/components/dashboard/profile/views/ViewUserDisplay';
import Profile from './src/components/dashboard/Profile';
import {Provider} from 'react-redux';
import configureStore from './src/store/ConfigureStore';

import {
    StackNavigator,
} from 'react-navigation';

const store = configureStore();

const Route = StackNavigator({
    Home: { screen: Login },
    SignUp: { screen: SignUp },
    Landing: {screen: Dashboard},
    UploadView: {screen: Upload},
    SingleView: {screen: SingleView},
    LoginTab: {screen: LoginTab},
    UserLikes: {screen: UserLikes},
    ViewFollowers: {screen: ViewUser},
    UserProfileView: {screen: Profile}
});

const App = () => (
  <Provider store={store} >
      <Route/>
  </Provider>
);


export default App;