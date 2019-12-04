import React from 'react';
import { shallow } from 'enzyme';
import Game from './index';

describe('Game component', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ name: 'test', difficulty: 'easy' }));
  });
  const match = {
    params: {
      username: 'abc',
    },
  };

  it('renders without crashing', () => {
    shallow(<Game match={match} />);
  });
});
