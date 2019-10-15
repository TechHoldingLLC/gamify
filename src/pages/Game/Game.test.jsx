import React from 'react';
import { shallow } from 'enzyme';
import Game from './index';

describe('Game component', () => {
  const match = {
    params: {
      username: 'abc',
    },
  };

  it('renders without crashing', () => {
    shallow(<Game match={match} />);
  });
});
