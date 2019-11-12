import React from 'react';
import { sampleSize, cloneDeep, shuffle, concat } from 'lodash';
import data from '../data/data';

export const defaultWaitingTime = 10;
export const defaultTimeout = 2;
export const defaultCards = 6;
export const defaultPlayTime = 60;

export const useGameState = () => {
  let [numOfCards] = React.useState(defaultCards);
  let [allOpen, setAllOpen] = React.useState(true);
  let [lock, setLock] = React.useState(true);
  let [playing, setPlaying] = React.useState(0);
  let [selected, setSelected] = React.useState(null);
  let [timeTaken, setTimeTaken] = React.useState(0);
  let [score, setScore] = React.useState(0);
  let [cards, setCards] = React.useState([]);
  let [attempts, setAttempts] = React.useState(0);
  let [isModalOpen, setIsModalOpen] = React.useState(true);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const play = () => {
    let randomCards = sampleSize(data, numOfCards / 2);
    randomCards = randomCards.map((card) => {
      card.key = Math.random()
        .toString(36)
        .substring(7);
      card.open = false;
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
    }, defaultWaitingTime * 1000);
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
    } else if (selected !== null && index !== selected && cards[index].key === cards[selected].key) {
      cards[index].open = true;
      cards[index].matched = true;
      cards[selected].matched = true;
      setSelected(null);
      setScore(++score);
      setAttempts(++attempts);
      setCards(cards);
      if (score === numOfCards / 2) {
        setTimeout(() => setPlaying(2), defaultTimeout * 1000);
      }
      setLock(false);
    } else if (selected !== null && index !== selected && cards[index].key !== cards[selected].key) {
      cards[index].open = true;
      cards[index].notMatched = true;
      cards[selected].notMatched = true;
      const prev = selected;
      setSelected(index);
      setAttempts(++attempts);
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

  return [
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
  ];
};
