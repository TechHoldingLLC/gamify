import React from 'react';
import { shallow } from 'enzyme';
import Anchor from './index';

describe('Anchor component', () => {
  it('Should render without crashing', () => {
    shallow(
      <Anchor to="/">
        <span>Test</span>
      </Anchor>,
    );
  });
});
