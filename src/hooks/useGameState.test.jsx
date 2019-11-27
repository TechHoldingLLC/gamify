/* eslint-disable react/jsx-handler-names */
import React from 'react';
import { mount } from 'enzyme';

import { act } from 'react-dom/test-utils';

import Game from '../pages/Game';
import Cards from '../pages/Game/Cards';

jest.useFakeTimers();

jest.mock('../components/Anchor', () => ({ children }) => <>{children}</>);

describe('useGameState hook', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ name: 'test', difficulty: 'easy' }));
  });
  const match = {
    params: {
      username: 'abc',
    },
  };
  it('Should render without crashing', async () => {
    mount(<Game match={match} />);
  });

  it('should start playing game on play button click', () => {
    const wrapper = mount(<Game match={match} />);
    const playButton = wrapper.find('.playButton');
    playButton.first().simulate('click');
    wrapper.update();
    expect(wrapper.find('.card').exists()).toBe(true);
  });

  it('should call stop function on timeout', async () => {
    const wrapper = mount(<Game match={match} />);
    const playButton = wrapper.find('.playButton');
    playButton.first().simulate('click');
    await act(() => {
      wrapper.update();
      jest.runAllTimers();
      wrapper.update();
    });
    expect(wrapper.find('.card').exists()).toBe(false);
  });

  it('should flip card on click', async () => {
    const wrapper = mount(<Game match={match} />);
    const playButton = wrapper.find('.playButton');
    playButton.first().simulate('click');
    jest.advanceTimersByTime(10000);
    await act(() => wrapper.update());
    await act(() => {
      wrapper
        .find('.card')
        .first()
        .simulate('click');

      wrapper.update();
    });
    console.log(wrapper.find(Cards).props());
  });
});
