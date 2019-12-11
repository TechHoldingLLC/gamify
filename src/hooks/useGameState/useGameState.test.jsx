import React from 'react';
import { mount } from 'enzyme';
import findIndex from 'lodash/findIndex';
import cloneDeep from 'lodash/cloneDeep';
import { act } from 'react-dom/test-utils';
import { useGameState } from './index';

jest.useFakeTimers();

const TestHook = ({ callback }) => {
  callback();
  return null;
};

const testHook = (callback) => {
  mount(<TestHook callback={callback} />);
};
let gameState;
beforeEach(() => {
  testHook(() => {
    gameState = useGameState('easy');
  });
});
describe('useGameState hook', () => {
  it('Should return initial play state', () => {
    expect(gameState.playing).toBe(0);
  });

  it('Should start playing geme on play click', async () => {
    act(() => {
      gameState.play();
    });
    expect(gameState.cards.length).toBe(gameState.numOfCards);
  });

  it('Should flip card on flipCard call', async () => {
    await act(async () => {
      await gameState.play();

      await gameState.flipCard(0);
    });

    expect(gameState.selected).toBe(0);
  });

  it('Should flip another card on flipCard call', async () => {
    await act(async () => {
      await gameState.play();

      await gameState.flipCard(0);

      await gameState.flipCard(1);
    });
    expect(gameState.attempts).toBe(1);
  });

  it('Should match correct cards', async () => {
    await act(async () => {
      await gameState.play();

      await gameState.flipCard(0);
      const cards = cloneDeep(gameState.cards);
      const firstCard = cards.shift();
      await gameState.flipCard(findIndex(cards, (c) => c.key === firstCard.key) + 1);
    });
    expect(gameState.score).toBe(1);
  });

  it('Should stop playing game on timeout', async () => {
    await act(async () => {
      await gameState.play();
      jest.runAllTimers();
    });

    expect(gameState.playing).toBe(1);
  });

  it('Should stop palying game on stop call', async () => {
    await act(async () => {
      await gameState.play();
      await gameState.stop();
    });

    expect(gameState.playing).toBe(2);
  });
});
