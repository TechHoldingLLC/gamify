import React, { useState } from 'react';
import PropTypes from 'prop-types';
import s from './Login.module.scss';
import Input from '../../components/Input';
import Default from '../../layouts/Default';
import Button from '../../components/Button';
import { ReactComponent as HandLogo } from '../../assets/svgs/hand-logo.svg';
import { ReactComponent as EasyCard } from '../../assets/svgs/easy-cards.svg';
import { ReactComponent as MediumCard } from '../../assets/svgs/medium-cards.svg';
import { ReactComponent as HardCard } from '../../assets/svgs/hard-cards.svg';
import { EASY, MEDIUM, HARD } from '../../constants/difficulty';

const propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

const Login = ({ history }) => {
  const [userName, setUserName] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const handleOnSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({ name: userName, difficulty }));
    history.push(`/game/${userName}`);
  };

  const handleInputChange = (e) => {
    setUserName(e.target.value);
  };

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
  };

  return (
    <Default>
      <div className={s.root}>
        <div className={s.logoContainer}>
          <HandLogo />
          <div className={s.titleContainer}>
            <span className={s.welcome}>Welcome to</span>
            <span className={s.gamify}>GAMIFY</span>
          </div>
        </div>
        <form onSubmit={handleOnSubmit} className={s.formContainer}>
          <Input
            name="username"
            placeholder="Enter Name"
            value={userName}
            onChange={handleInputChange}
            required
          />
          <div className={s.difficultyContainer}>
            <div
              className={[s.difficulty, difficulty === EASY ? s.selected : ''].join(' ')}
              onClick={() => handleDifficultyChange(EASY)}
              onKeyPress={() => handleDifficultyChange(EASY)}
              tabIndex="0"
              role="button"
              id="easy-button"
            >
              <EasyCard />
              <span>Easy</span>
            </div>
            <div
              id="medium-button"
              className={[s.difficulty, difficulty === MEDIUM ? s.selected : ''].join(' ')}
              onClick={() => handleDifficultyChange(MEDIUM)}
              onKeyPress={() => handleDifficultyChange(MEDIUM)}
              tabIndex="0"
              role="button"
            >
              <MediumCard />
              <span>Medium</span>
            </div>
            <div
              className={[s.difficulty, difficulty === HARD ? s.selected : ''].join(' ')}
              onClick={() => handleDifficultyChange(HARD)}
              onKeyPress={() => handleDifficultyChange(HARD)}
              tabIndex="0"
              role="button"
            >
              <HardCard />
              <span>Hard</span>
            </div>
          </div>
          <Button className={s.btn} color="danger" size="lg" type="submit">
            START GAME
          </Button>
        </form>
      </div>
    </Default>
  );
};

Login.propTypes = propTypes;
export default Login;
