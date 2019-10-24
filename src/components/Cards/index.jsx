import * as React from 'react';
import s from './Card.module.scss';

export const Card = ({ text, open, onClick, index, lock, matched }) => (
  <div
    onClick={() => (matched ? null : !lock ? onClick(index) : null)}
    className={matched ? `${s.card} ${s.matched}` : `${s.card}`}
  >
    <div className={matched ? `${s.cardInner} ${s.open}` : open ? `${s.cardInner} ${s.open}` : `${s.cardInner}`}>
      <div className={s.front}>Front</div>
      <div className={s.back}>
        <h1>{text}</h1>
      </div>
    </div>
  </div>
);

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
          matched={card.matched}
        />
      )
    );
  });
};
