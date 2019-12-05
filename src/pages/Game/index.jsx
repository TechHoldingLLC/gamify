import React from 'react';
import PropTypes from 'prop-types';
import Cards from './Cards';
import Anchor from '../../components/Anchor';
import { useGameState, defaultWaitingTime, defaultPlayTime } from '../../hooks/useGameState';
import s from './Game.module.scss';
import Default from '../../layouts/Default';
import Timer from '../../components/Timer';
import { ReactComponent as HeaderLogo } from './hand-logo-small.svg';
import AlertModal from '../../components/AlertModal';

const propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const Game = ({ match }) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  const {
    numOfCards,
    cards,
    selected,
    allOpen,
    flipCard,
    lock,
    score,
    attempts,
    isModalOpen,
    toggleModal,
    playing,
    play,
    stop,
    timeTaken,
    scoreToWin,
  } = useGameState(userData.difficulty);

  return (
    <Default>
      <div className={s.game}>
        <div className={s.header}>
          <ul className={s.leftHeader}>
            <li>
              <HeaderLogo />
            </li>
            {playing === 1 && <li>{`Attempts: ${attempts}`}</li>}
            {playing === 1 && <li>{`Score: ${score}`}</li>}
            {playing !== 0 && timeTaken === 0 && (
              <li>
                <Timer
                  onTimeout={stop}
                  playing={playing}
                  score={score}
                  defaultPlayTime={defaultPlayTime}
                />
              </li>
            )}
          </ul>
          <ul className={s.rightHeader}>
            {playing !== 0 && (
              <li>
                <Anchor size="md" color="success" to="#" onClick={play}>
                  Restart
                </Anchor>
              </li>
            )}
            <li>
              <Anchor size="sm" color="danger" to="/logout">
                Exit
              </Anchor>
            </li>
            <li className={s.username}>{`User: ${match.params.username}`}</li>
          </ul>
        </div>
        <div
          className={s.gameBoard}
          style={{ 'grid-template-columns': `repeat(${numOfCards / 2}, 0fr)` }}
        >
          <Cards
            cards={cards}
            allOpen={allOpen}
            flipCard={flipCard}
            lock={lock}
            selected={selected}
          />
        </div>
        <AlertModal
          isOpen={isModalOpen && playing === 0}
          username={match.params.username}
          desc1={`Let’s start the GAMIFY. You will get ${numOfCards} cards open for ${defaultWaitingTime} secs and will turn
            back. You will have to match the cards in 60 secs.`}
          btnLabel="Play Game"
          btnOnClick={play}
          toggleModal={toggleModal}
        />
        <AlertModal
          isOpen={playing === 2 && score !== scoreToWin}
          username={match.params.username}
          title="Ohhhh no, times up!!!"
          desc1="Your time of 60 seconds is over for the game. Please try again to click on below button."
          desc2={`Attempt: ${attempts} Score: ${score} time: ${defaultPlayTime}`}
          btnLabel="Retake The Game"
          btnOnClick={play}
          toggleModal={toggleModal}
        />
        <AlertModal
          isOpen={playing === 2 && score === scoreToWin}
          username={match.params.username}
          title="Congratulations, You’re a Pro."
          desc1="You have completed the game within…"
          desc2={` Attempt: ${attempts} Score: ${score} Time: ${timeTaken}`}
          btnLabel="Retake The Game"
          btnOnClick={play}
          toggleModal={toggleModal}
        />
      </div>
    </Default>
  );
};

Game.propTypes = propTypes;
export default Game;
