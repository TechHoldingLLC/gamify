import React from 'react';
import { shallow } from 'enzyme';
import withAuthCheck from './index';

describe('App component', () => {
  it('renders without crashing', () => {
    shallow(<withAuthCheck />);
  });

  it('should set state when user is valid', () => {
    localStorage.setItem('user', JSON.stringify({ name: 'test' }));
    const mockComponent = () => <></>;
    const WrappedMock = withAuthCheck(mockComponent, true);

    const wrapper = shallow(<WrappedMock />);
    wrapper.instance().componentDidMount();
    expect(wrapper.instance().state.isLoggedIn).toBe(true);
    localStorage.removeItem('user');
  });

  it('should set state when user is invalid', () => {
    const mockComponent = () => <></>;
    const WrappedMock = withAuthCheck(mockComponent, true);

    const wrapper = shallow(<WrappedMock />);
    wrapper.instance().componentDidMount();
    expect(wrapper.instance().state.isLoggedIn).toBe(false);
  });
});
