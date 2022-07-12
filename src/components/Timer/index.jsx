import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTimer } from 'use-timer';
import s from './Timer.module.scss';

const propTypes = {
  onTimeout: PropTypes.func.isRequired,
  playing: PropTypes.number.isRequired,
  defaultPlayTime: PropTypes.number.isRequired,
};

const Timer = ({ onTimeout, playing, defaultPlayTime }) => {
  const { time, start, pause } = useTimer({
    initialTime: defaultPlayTime,
    timerType: 'DECREMENTAL',
  });
  console.log('time--out---', time);

  useEffect(() => {
    console.log('time-----', time);
    console.log('playing-----', playing);
    if (time === 0 || playing === 2) {
      console.log('ssss-----');
      pause();
      onTimeout(time);
    } else {
      start();
    }
  }, [time, start, defaultPlayTime, onTimeout, playing, pause]);

  return <div className={s.timer}>{`Time: ${time}s`}</div>;
};

Timer.propTypes = propTypes;
export default Timer;
