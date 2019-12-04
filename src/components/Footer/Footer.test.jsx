import React from 'react';
import { shallow } from 'enzyme';
import Footer from './index';

describe('Footer component', () => {
  it('Should render without carshing', () => {
    shallow(<Footer />);
  });
});
