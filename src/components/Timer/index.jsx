import React, { useEffect } from 'react';
import { useTimer } from 'use-timer';
import s from './Timer.module.scss';

const Timer = ({ onTimeout, playing, defaultPlayTime }) => {
  const { time, start, pause } = useTimer({
    initialTime: defaultPlayTime,
    timerType: 'DECREMENTAL',
  });

  useEffect(() => {
    if (time === 0 || playing === 2) {
      pause();
      onTimeout(time);
    } else {
      start();
    }
  }, [time, start, defaultPlayTime, onTimeout, playing, pause]);

  return <div className={s.timer}>{`Time: ${time}s`}</div>;
};

export default Timer;
