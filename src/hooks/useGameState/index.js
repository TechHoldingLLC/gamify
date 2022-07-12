/* eslint-disable no-param-reassign */
import { useState, useCallback } from 'react';
import sampleSize from 'lodash/sampleSize';
import cloneDeep from 'lodash/cloneDeep';
import shuffle from 'lodash/shuffle';
import concat from 'lodash/concat';
import data from '../../data/data.json';
import { EASY, MEDIUM, HARD } from '../../constants/difficulty';

export const defaultWaitingTime = 5;
export const defaultTimeout = 2;
export const defaultCards = 6;
export const defaultPlayTime = 60;

export const waitingTimes = {
  [EASY]: 6,
  [MEDIUM]: 5,
  [HARD]: 4,
};

export const difficulties = {
  [EASY]: 6,
  [MEDIUM]: 8,
  [HARD]: 12,
};

export const useGameState = (difficulty) => {
  const numOfCards = difficulties[difficulty] ? difficulties[difficulty] : defaultCards;
  const waitingTime = waitingTimes[difficulty] ? waitingTimes[difficulty] : defaultWaitingTime;
  const scoreToWin = numOfCards / 2;
  const [allOpen, setAllOpen] = useState(true);
  const [lock, setLock] = useState(true);
  const [playing, setPlaying] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timeTaken, setTimeTaken] = useState(0);
  const [score, setScore] = useState(0);
  const [cards, setCards] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const play = useCallback(() => {
    const randomCards = sampleSize(data, numOfCards / 2).map((card) => {
      card.key = Math.random()
        .toString(36)
        .substring(7);
      card.open = false;
      card.matched = false;
      card.notMatched = false;
      return card;
    });
    const duplicateCards = cloneDeep(randomCards);
    const selectedCards = shuffle(concat(randomCards, duplicateCards));
    setAllOpen(true);
    setLock(true);
    setIsModalOpen(false);
    setScore(0);
    setAttempts(0);
    setTimeTaken(0);
    setSelected(null);
    setPlaying(0);
    setCards(selectedCards);
    setTimeout(() => {
      setAllOpen(false);
      setLock(false);
      setPlaying(1);
    }, waitingTime * 1000);
  }, [numOfCards, waitingTime]);

  const stop = useCallback(
    (time = 0) => {
      console.log('playing---time---', playing, time);
      setTimeTaken(defaultPlayTime - time);
      if (playing !== 2) {
        setPlaying(2);
      }
      setCards([]);
    },
    [playing],
  );

  const flipCard = useCallback(
    (index) => {
      setLock(true);
      if (selected === null) {
        cards[index].open = true;
        setSelected(index);
        setCards(cards);
        setLock(false);
      } else if (
        selected !== null &&
        index !== selected &&
        cards[index].key === cards[selected].key
      ) {
        cards[index].matched = true;
        cards[selected].matched = true;
        cards[index].open = true;
        setSelected(null);
        setScore(score + 1);
        setAttempts(attempts + 1);
        setCards(cards);
        if (score + 1 === numOfCards / 2) {
          setTimeout(() => setPlaying(2), defaultTimeout * 1000);
        }
        setLock(false);
      } else if (
        selected !== null &&
        index !== selected &&
        cards[index].key !== cards[selected].key
      ) {
        cards[index].notMatched = true;
        cards[selected].notMatched = true;
        cards[index].open = true;
        const prev = selected;
        setSelected(index);
        setAttempts(attempts + 1);
        setCards(cards);
        setTimeout(() => {
          cards[index].open = false;
          cards[index].notMatched = false;
          cards[selected].notMatched = false;
          cards[prev].open = false;
          setSelected(null);
          setCards(cards);
          setLock(false);
        }, defaultTimeout * 1000);
      } else {
        setLock(false);
      }
    },
    [numOfCards, selected, attempts, cards, score],
  );

  return {
    numOfCards,
    cards,
    selected,
    allOpen,
    flipCard,
    lock,
    score,
    attempts,
    isModalOpen,
    playing,
    play,
    stop,
    timeTaken,
    scoreToWin,
  };
};
