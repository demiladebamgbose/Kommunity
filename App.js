import React from 'react';
import Login from './src/components/user/Login';
import SignUp from './src/components/user/SignUp';
import Dashboard from './src/components/dashboard/landingPage';
import Upload from './src/components/upload/index';
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
    Upload: {screen: Upload}
});

const App = () => (
  <Provider store={store} >
      <Route/>
  </Provider>
);


export default App;