import React from 'react';
import Card from './Card';

export const Cards = ({ cards, allOpen, flipCard, lock }) => {
  return cards.map((card, i) => {
    return (
      i < cards.length && (
        <Card
          key={i}
          text={card.text}
          open={allOpen || card.open}
          onClick={flipCard}
          index={i}
          lock={lock}
          notMatched={card.notMatched}
          matched={card.matched}
        />
      )
    );
  });
};
