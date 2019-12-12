import React from 'react';
import { mount } from 'enzyme';
import Timer from './index';

describe('Timer component', () => {
  it('Should render without carshing', () => {
    mount(<Timer onTimeout={() => {}} playing={2} defaultPlayTime={2} />);
  });

  it('Should start timer on mount', () => {
    const wrapper = mount(<Timer onTimeout={() => {}} playing={0} defaultPlayTime={2} />);
    expect(
      wrapper
        .find('.timer')
        .text()
        .includes('Time:'),
    ).toBe(true);
  });
});
