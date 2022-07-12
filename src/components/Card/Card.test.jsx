import React from 'react';
import { shallow } from 'enzyme';
import Card from './index';

jest.mock('react', () => {
  return { ...jest.requireActual('react'), useId: jest.fn() };
});

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

  it('Should show matched state', () => {
    const wrapper = shallow(
      <Card
        text="Test"
        open={false}
        lock={false}
        onClick={() => {}}
        index={0}
        matched
        notMatched={false}
      />,
    );
    expect(wrapper.find('.right').exists()).toBe(true);
  });

  it('Should call onClick function', () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <Card
        text="Test"
        open={false}
        lock={false}
        onClick={onClick}
        index={0}
        matched={false}
        notMatched={false}
      />,
    );
    wrapper.find('.card').simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});
