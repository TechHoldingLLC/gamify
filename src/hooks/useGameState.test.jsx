import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { useGameState } from './useGameState';

const MockComponent = () => {
  const [numOfCards, playing, play, score] = useGameState('easy');

  return (
    <>
      <span className="number-of-cards">{numOfCards}</span>
      <span className="score-element">{score}</span>
      <button type="button" id="play-btn" onClick={() => play()}>
        Play
      </button>
      {playing === 1 && <span className="is-playing-flag">{playing}</span>}
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

  //   it('Should play the game on Play button click', async () => {
  //     let wrapper;
  //     await act(async () => {
  //       wrapper = mount(<MockComponent />);
  //     });
  //     wrapper.find('#play-btn').simulate('click');
  //     await act(async () => wrapper.update());
  //     expect(wrapper.find('is-playing-flag').exists()).toBe(true);
  //   });
});
