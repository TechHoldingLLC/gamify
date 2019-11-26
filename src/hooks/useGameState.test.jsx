/* eslint-disable react/jsx-handler-names */
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';

// import { act } from 'react-dom/test-utils';
// import wait from 'waait';
import Game from '../pages/Game';

jest.useFakeTimers();

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
    mount(
      <MemoryRouter>
        {' '}
        <Game match={match} />
      </MemoryRouter>,
    );
  });
});
