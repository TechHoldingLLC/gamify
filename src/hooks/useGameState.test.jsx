/* eslint-disable react/jsx-handler-names */
import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import wait from 'waait';
import { useGameState } from './useGameState';

const MockComponent = () => {
  const { numOfCards, score, play, playing, stop } = useGameState('easy');
  return (
    <>
      <span className="number-of-cards">{numOfCards}</span>
      <span className="score-element">{score}</span>
      <button type="button" id="play-btn" onClick={play}>
        Play
      </button>
      {playing === 1 && <span id="is-playing-flag">{playing}</span>}
      {playing === 1 && (
        <button type="button" id="stop-btn" onClick={stop}>
          Stop
        </button>
      )}
    </>
  );
};

describe('useGameState hook', () => {
  it('Should return number of cards and score', async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(<MockComponent />);
    });

    expect(wrapper.find('.number-of-cards').exists()).toBe(true);
  });

  it('Should play the game on Play button click', async () => {
    jest.setTimeout(20000);

    let wrapper;
    await act(async () => {
      wrapper = mount(<MockComponent />);
    });
    wrapper.find('#play-btn').simulate('click');
    await act(async () => {
      await wait(11000);

      await wrapper.update();

      expect(wrapper.find('#is-playing-flag').exists()).toBe(true);
    });
  });

  it('Should stop game on stop button click', async () => {
    jest.setTimeout(20000);
    let wrapper;
    await act(async () => {
      wrapper = mount(<MockComponent />);
    });
    wrapper.find('#play-btn').simulate('click');

    await act(async () => {
      await wait(11000);
      wrapper.update();
      wrapper.find('#stop-btn').simulate('click');
      expect(wrapper.find('#stop-btn').exists()).toBe(false);
    });
  });
});
