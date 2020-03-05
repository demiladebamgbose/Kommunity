jest.mock('./src/api/userApi');
import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';


describe('Adds Root component', () => {
  const wrapper = shallow((
    <App
    />
  ));

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  })

});
