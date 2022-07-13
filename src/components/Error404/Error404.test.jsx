import React from 'react';
import { render } from '@testing-library/react';
import Error404 from './index';

describe('Error404 component', () => {
  test('renders without crashing', () => {
    render(<Error404 />);
  });
});
