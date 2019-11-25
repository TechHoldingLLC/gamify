/* eslint-disable no-param-reassign */
import { useState } from 'react';
import sampleSize from 'lodash/sampleSize';
import cloneDeep from 'lodash/cloneDeep';
import shuffle from 'lodash/shuffle';
import concat from 'lodash/concat';
import data from '../data/data';
import { EASY, MEDIUM, HARD } from '../constants/difficulty';

export const defaultWaitingTime = 10;
export const defaultTimeout = 2;
export const defaultCards = 6;
export const defaultPlayTime = 60;

const waitingTimes = {
  [EASY]: 10,
  [MEDIUM]: 8,
  [HARD]: 6,
};

const difficulties = {
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
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const play = () => {
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
  };

  const stop = (time = 0) => {
    setTimeTaken(defaultPlayTime - time);
    if (playing !== 2) {
      setPlaying(2);
    }
    setCards([]);
  };

  const flipCard = (index) => {
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
      cards[index].open = true;
      cards[index].matched = true;
      cards[selected].matched = true;
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
      cards[index].open = true;
      cards[index].notMatched = true;
      cards[selected].notMatched = true;
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
  };

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
    toggleModal,
    playing,
    play,
    stop,
    timeTaken,
    scoreToWin,
  };
};
