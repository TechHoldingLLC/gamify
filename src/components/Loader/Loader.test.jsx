import React from 'react';
import { render } from '@testing-library/react';
import Loader from './index';

describe('Loader component', () => {
  test('renders without crashing', () => {
    render(<Loader />);
  });
});
