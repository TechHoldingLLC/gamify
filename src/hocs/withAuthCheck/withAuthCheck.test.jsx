import React from 'react';
import { shallow } from 'enzyme';

describe('App component', () => {
  it('renders without crashing', () => {
    shallow(<withAuthCheck />);
  });
});
