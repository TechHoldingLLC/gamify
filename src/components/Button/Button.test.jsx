import React from 'react';
import { render } from '@testing-library/react';
import Button from './index';

describe('Button component', () => {
  test('renders without crashing', () => {
    render(
      <Button client={{}} location={{}} history={{}}>
        Some mock string
      </Button>,
    );
  });
});
