import React from 'react';
import { shallow } from 'enzyme';
import Logout from './index';

describe('Logout component', () => {
  it('Should render without crashing', () => {
    shallow(<Logout />);
  });
});
