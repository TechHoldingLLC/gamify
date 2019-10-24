import * as React from 'react';
import PropTypes from 'prop-types';
import { Cards } from '../../components/Cards';
import { useGameState } from '../../hooks/useGameState';
import s from './Game.module.scss';

const propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const Game = ({ match }) => {
  let [cards, allOpen, flipCard, lock, score, attempts] = useGameState();

  return (
    <div className={s.game}>
      <div className={s.header}>
        Game
        <span>Score: {score}</span>
        <span>User: {match.params.username}</span>
        <span>Attempts: {attempts}</span>
      </div>
      <div className={s.gameBoard}>
        <Cards cards={cards} allOpen={allOpen} flipCard={flipCard} lock={lock} />
      </div>
    </div>
  );
};

Game.propTypes = propTypes;

export default Game;
