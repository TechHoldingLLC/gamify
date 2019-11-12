import React from 'react';
import s from './Card.module.scss';
import { ReactComponent as CardTop } from '../../assets/images/svgs/card-top-pattern.svg';
import { ReactComponent as CardBottom } from '../../assets/images/svgs/card-bottom-pattern.svg';
import { ReactComponent as CheckIcon } from '../../assets/images/svgs/check-icon.svg';
import { ReactComponent as CloseIcon } from '../../assets/images/svgs/close-icon.svg';

export const Card = ({ text, open, onClick, index, lock, matched, selected, notMatched }) => (
  <div onClick={() => (matched ? null : !lock ? onClick(index) : null)} className={matched ? `${s.card}` : `${s.card}`}>
    <div className={matched ? `${s.cardInner} ${s.open}` : open ? `${s.cardInner} ${s.open}` : `${s.cardInner}`}>
      <div className={s.front}></div>
      <div className={s.back}>
        <div
          className={
            matched ? `${s.backInner} ${s.matched}` : notMatched ? `${s.backInner} ${s.notMatched}` : `${s.backInner}`
          }
        >
          <div className={s.cardTop}>
            <CardTop />
          </div>
          <div className={s.cardMiddle}>
            <h1>{text}</h1>
          </div>
          <div className={s.cardBottom}>
            <CardBottom />
          </div>
          {matched && (
            <div className={s.right}>
              <CheckIcon /> <span>Right Match</span>
            </div>
          )}
          {notMatched && (
            <div className={s.wrong}>
              <CloseIcon />
              <span>Wrong Match</span>
            </div>
          )}
        </div>
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
          notMatched={card.notMatched}
          matched={card.matched}
        />
      )
    );
  });
};
