import React from 'react';
import { shallow } from 'enzyme';
import Button from './index';

describe('Button component', () => {
  it('renders without crashing', () => {
    shallow(
      <Button client={{}} location={{}} history={{}}>
        Some mock string
      </Button>,
    );
  });
});
