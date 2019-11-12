import * as React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Cards } from '../../components/Cards';
import Anchor from '../../components/Anchor';
import { useGameState, defaultWaitingTime, defaultPlayTime } from '../../hooks/useGameState';
import s from './Game.module.scss';
import Default from '../../layouts/Default';
import Button from '../../components/Button';
import { Timer } from '../../components/Timer';
import { ReactComponent as HeaderLogo } from '../../assets/images/svgs/hand-logo.svg';

const propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const customStyles = {
  content: {
    width: '50%',
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '50px 50px',
    borderRadius: '10px',
    fontSize: '25px',
    lineHeight: '30px',
    textAlign: 'center',
    overflow: 'unset',
  },
};

Modal.defaultStyles.overlay.backgroundColor = 'transparent';
Modal.defaultStyles.overlay.top = '60px';

Modal.setAppElement('#root');

const Game = ({ match }) => {
  let [
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
  ] = useGameState();

  return (
    <Default>
      <div className={s.game}>
        <div className={s.header}>
          <ul className={s.leftHeader}>
            <li>
              <HeaderLogo />
            </li>
            {playing === 1 && <li className={s.attempts}>Attempts: {attempts}</li>}
            {playing === 1 && <li className={s.score}>Score: {score}</li>}
            {playing !== 0 && timeTaken === 0 && (
              <li className={s.timer}>
                <Timer onTimeout={stop} playing={playing} score={score} defaultPlayTime={defaultPlayTime} />
              </li>
            )}
          </ul>
          <ul className={s.rightHeader}>
            {playing !== 0 && (
              <li>
                <Anchor size={'md'} color={'success'} to={'/'}>
                  Restart
                </Anchor>
              </li>
            )}
            <li>
              <Anchor size={'sm'} color={'danger'} to={'/logout'}>
                Exit
              </Anchor>
            </li>
            <li className={s.username}>User: {match.params.username}</li>
          </ul>
        </div>
        <div className={s.gameBoard}>
          <Cards cards={cards} allOpen={allOpen} flipCard={flipCard} lock={lock} selected={selected} />
        </div>
        <Modal
          isOpen={isModalOpen && playing === 0}
          onAfterOpen={null}
          onRequestClose={toggleModal}
          style={customStyles}
          contentLabel=""
          shouldCloseOnOverlayClick={false}
        >
          <h2 className={s.modalTitle}>
            Hi <span>{match.params.username}</span>
          </h2>
          <p>
            Let’s start the GAMIFY. You will get {numOfCards} cards open for {defaultWaitingTime} secs and will turn
            back. You will have to match the cards in 60 secs.
          </p>
          <p>Click below at “PLAY GAME” button to get started!</p>
          <Button size={'lg'} color={'success'} className={s.playButton} onClick={play}>
            Play Game
          </Button>
        </Modal>
        <Modal
          isOpen={playing === 2 && score !== 3}
          onAfterOpen={null}
          onRequestClose={toggleModal}
          style={customStyles}
          contentLabel=""
          shouldCloseOnOverlayClick={false}
        >
          <h2 className={s.modalTitle}>
            Hi <span>{match.params.username}</span>
          </h2>
          <p>Ohhhh no, times up!!!</p>
          <p>
            Your time of 60 seconds is over for the game. Please try again to click on below button.
            <br />
            Attempt: {attempts} Score: {score} time: {defaultPlayTime}
          </p>
          <Button size={'lg'} color={'success'} className={s.playButton} onClick={play}>
            Retake The Game
          </Button>
        </Modal>
        <Modal
          isOpen={playing === 2 && score === 3}
          onAfterOpen={null}
          onRequestClose={toggleModal}
          style={customStyles}
          contentLabel=""
          shouldCloseOnOverlayClick={false}
        >
          <h2 className={s.modalTitle}>
            Hi <span>{match.params.username}</span>
          </h2>
          <p>Congratulations, You’re a Pro.</p>
          <p>
            You have completed the game within…
            <br /> Attempt: {attempts} Score: {score} Time: {timeTaken}
          </p>
          <Button size={'lg'} color={'success'} className={s.playButton} onClick={play}>
            Retake The Game
          </Button>
        </Modal>
      </div>
    </Default>
  );
};

Game.propTypes = propTypes;

export default Game;
