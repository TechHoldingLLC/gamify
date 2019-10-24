import React from 'react';
import { shallow } from 'enzyme';
import Input from './index';

describe('Input component', () => {
  it('renders without crashing', () => {
    shallow(<Input />);
  });

  it('should display error message', () => {
    const wrapper = shallow(<Input isError errorText="Error message" />);
    expect(wrapper.find('.errorText').exists()).toBe(true);
  });
});
