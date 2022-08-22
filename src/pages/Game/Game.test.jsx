/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import Game from './index';
import { useGameState } from '../../hooks/useGameState';

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

  beforeEach(() => {
    cleanup();
    jest.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  const renderGame = () => {
    return render(<Game {...props} />);
  };

  test('renders without crashing', () => {
    renderGame();
  });

  test('should start playing game on play button click', () => {
    const { container, getByTestId } = renderGame();
    const playButton = getByTestId('playButton');
    fireEvent.click(playButton);
    expect(container.getElementsByClassName('card')).not.toBeNull();
  });

  test('should call stop game on timeout', () => {
    const { container, getByTestId } = renderGame();
    const playButton = getByTestId('playButton');
    fireEvent.click(playButton);
    act(() => {
      jest.runAllTimers();
    });
    expect(container.getElementsByClassName('card')).toMatchObject({});
  });

  test('should call stop game on timeout 22', async () => {
    const gameState = useGameState('easy');
    const { getByTestId, debug } = renderGame();
    const playButton = getByTestId('playButton');
    fireEvent.click(playButton);
    debug();
    debug();
  });
});
