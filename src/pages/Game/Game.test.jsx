import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Game from './index';

jest.useFakeTimers();

jest.mock('../../components/Anchor', () => ({ children }) => <>{children}</>);

describe('Game component', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ name: 'test', difficulty: 'easy' }));
  });
  const match = {
    params: {
      username: 'abc',
    },
  };

  it('renders without crashing', () => {
    shallow(<Game match={match} />);
  });

  it('should start playing game on play button click', () => {
    const wrapper = mount(<Game match={match} />);
    const playButton = wrapper.find('.playButton');
    playButton.first().simulate('click');
    wrapper.update();
    expect(wrapper.find('.card').exists()).toBe(true);
  });
  it('should call stop game on timeout', async () => {
    const wrapper = mount(<Game match={match} />);
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
