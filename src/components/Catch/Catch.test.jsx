import React from 'react';
import { shallow } from 'enzyme';
import Catch from './index';

describe('Catch component', () => {
  it('Should render without crashing', () => {
    shallow(<Catch>Test</Catch>);
  });

  it('Should throw error', () => {
    const Something = () => null;
    const wrapper = shallow(
      <Catch>
        <Something />
      </Catch>,
    );

    const error = new Error('Boom!');
    wrapper.find(Something).simulateError(error);

    expect(wrapper.state().hasError).toBe(true);
  });
});
