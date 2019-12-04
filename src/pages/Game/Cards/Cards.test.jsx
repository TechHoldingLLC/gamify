import React from 'react';
import { shallow } from 'enzyme';
import Cards from './index';

describe('Cards component', () => {
  it('Should render without crashing', () => {
    shallow(<Cards cards={[]} allOpen={false} flipCard={() => {}} lock={false} />);
  });
});
