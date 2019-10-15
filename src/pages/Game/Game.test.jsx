import React from 'react';
import { shallow } from 'enzyme';
import Game from './index';

describe('Game component', () => {
  it('renders without crashing', () => {
    shallow(<Game />);
  });
});
