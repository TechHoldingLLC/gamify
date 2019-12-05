import React from 'react';
import PropTypes from 'prop-types';
import s from './Card.module.scss';
import { ReactComponent as CardTop } from './svgs/card-top-pattern.svg';
import { ReactComponent as CardBottom } from './svgs/card-bottom-pattern.svg';
import { ReactComponent as CheckIcon } from './svgs/check-icon.svg';
import { ReactComponent as CloseIcon } from './svgs/close-icon.svg';

const propTypes = {
  text: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  lock: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  matched: PropTypes.bool.isRequired,
  notMatched: PropTypes.bool.isRequired,
};

const Card = ({ text, open, onClick, index, lock, matched, notMatched }) => {
  const onCardClick = () => (matched || lock ? null : onClick(index));
  return (
    <div
      role="button"
      onClick={onCardClick}
      onKeyPress={onCardClick}
      tabIndex="0"
      className={s.card}
    >
      <div className={[s.cardInner, matched || open ? s.open : ''].join(' ')}>
        <div className={s.front} />
        <div className={s.back}>
          <div
            className={[s.backInner, matched ? s.matched : '', notMatched ? s.notMatched : ''].join(
              ' ',
            )}
          >
            <div>
              <CardTop />
            </div>
            <div className={s.cardMiddle}>
              <h1>{text}</h1>
            </div>
            <div>
              <CardBottom />
            </div>
            {matched && (
              <div className={s.right}>
                <CheckIcon />
                <span> Right Match</span>
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
};

Card.propTypes = propTypes;
export default Card;
