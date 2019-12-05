import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';

const propTypes = {
  cards: PropTypes.array.isRequired,
  allOpen: PropTypes.bool.isRequired,
  flipCard: PropTypes.func.isRequired,
  lock: PropTypes.bool.isRequired,
};

const Cards = ({ cards, allOpen, flipCard, lock }) =>
  cards.map((card, i) => (
    <Card
      // eslint-disable-next-line react/no-array-index-key
      key={`${card.text}${i}`}
      text={card.text}
      open={allOpen || card.open}
      onClick={flipCard}
      index={i}
      lock={lock}
      notMatched={card.notMatched}
      matched={card.matched}
    />
  ));

Cards.propTypes = propTypes;
export default Cards;
