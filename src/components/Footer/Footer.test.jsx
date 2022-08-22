import React from 'react';
import { render } from '@testing-library/react';
import Footer from './index';

describe('Footer component', () => {
  test('Should render without carshing', () => {
    render(<Footer />);
  });
});
