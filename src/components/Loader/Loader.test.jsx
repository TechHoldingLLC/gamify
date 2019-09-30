import React from 'react';
import { shallow } from 'enzyme';
import Loader from './index';

describe('Loader component', () => {
  it('renders without crashing', () => {
    shallow(<Loader />);
  });
});
