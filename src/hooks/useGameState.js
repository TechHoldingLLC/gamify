import * as _ from 'lodash';
import data from '../data/data';
import * as React from 'react';

export const useGameState = () => {
  let [numOfCards] = React.useState(6);
  let [allOpen, setAllOpen] = React.useState(true);
  let [lock, setLock] = React.useState(true);
  let [selected, setSelected] = React.useState(null);
  let [score, setScore] = React.useState(0);
  let [cards, setCards] = React.useState([]);
  let [attempts, setAttempts] = React.useState(0);

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
      setLock(false);
    } else if (selected !== null && index !== selected && cards[index].key !== cards[selected].key) {
      cards[index].open = true;
      const prev = selected;
      setSelected(index);
      setAttempts(++attempts);
      setCards(cards);
      setTimeout(() => {
        cards[index].open = false;
        cards[prev].open = false;
        setSelected(null);
        setCards(cards);
        setLock(false);
      }, 2000);
    } else {
      setLock(false);
    }
  };

  React.useLayoutEffect(() => {
    let randomCards = _.sampleSize(data, numOfCards / 2);
    randomCards = randomCards.map((card) => {
      card.key = Math.random()
        .toString(36)
        .substring(7);
      card.open = false;
      card.matched = false;
      return card;
    });
    const duplicateCards = _.cloneDeep(randomCards);
    const selectedCards = _.shuffle(_.concat(randomCards, duplicateCards));
    setCards(selectedCards);
    setAllOpen(true);
    setLock(true);
  }, [numOfCards]);

  React.useEffect(() => {
    setTimeout(() => {
      setAllOpen(false);
      setLock(false);
    }, 2000);
  }, [cards, numOfCards]);

  return [cards, allOpen, flipCard, lock, score, attempts];
};
