import React from 'react';
import { shallow } from 'enzyme';
import Error404 from './index';

describe('Error404 component', () => {
  it('renders without crashing', () => {
    shallow(<Error404 />);
  });
});
