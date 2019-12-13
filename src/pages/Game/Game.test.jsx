/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Game from './index';

jest.useFakeTimers();

jest.mock('../../components/Anchor', () => ({ children }) => <>{children}</>);

describe('Game component', () => {
  const props = {
    match: {
      params: {
        username: 'abc',
      },
    },
    user: {
      name: 'abc',
      difficulty: 'easy',
    },
  };

  it('renders without crashing', () => {
    shallow(<Game {...props} />);
  });

  it('should start playing game on play button click', () => {
    const wrapper = mount(<Game {...props} />);
    const playButton = wrapper.find('.playButton');
    playButton.first().simulate('click');
    wrapper.update();
    expect(wrapper.find('.card').exists()).toBe(true);
  });
  it('should call stop game on timeout', async () => {
    const wrapper = mount(<Game {...props} />);
    const playButton = wrapper.find('.playButton');
    playButton.first().simulate('click');
    act(() => {
      wrapper.update();
      jest.runAllTimers();
      wrapper.update();
    });
    expect(wrapper.find('.card').exists()).toBe(false);
  });
});
