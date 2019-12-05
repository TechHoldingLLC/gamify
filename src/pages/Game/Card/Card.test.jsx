import React from 'react';
import { shallow } from 'enzyme';
import Card from './index';

describe('Card component', () => {
  it('Should render without carshing', () => {
    shallow(
      <Card
        text="Test"
        open={false}
        lock={false}
        onClick={() => {}}
        index={0}
        matched={false}
        notMatched
      />,
    );
  });
});
