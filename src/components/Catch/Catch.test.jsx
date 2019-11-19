import React from 'react';
import { shallow } from 'enzyme';
import Catch from './index';

describe('Catch component', () => {
  it('Should render without crashing', () => {
    shallow(<Catch>Test</Catch>);
  });
});
