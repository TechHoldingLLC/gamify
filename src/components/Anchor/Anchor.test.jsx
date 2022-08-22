import React from 'react';
import { render } from '@testing-library/react';
import Anchor from './index';

describe('Anchor component', () => {
  test('Should render without crashing', () => {
    render(
      <Anchor to="/">
        <span>Test</span>
      </Anchor>,
    );
  });
});
