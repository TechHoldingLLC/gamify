import React, { useId } from 'react';
import PropTypes from 'prop-types';
import s from './Card.module.scss';
import { ReactComponent as CardTop } from '../../assets/svgs/card-top-pattern.svg';
import { ReactComponent as CardBottom } from '../../assets/svgs/card-bottom-pattern.svg';
import { ReactComponent as CheckIcon } from '../../assets/svgs/check-icon.svg';
import { ReactComponent as CloseIcon } from '../../assets/svgs/close-icon.svg';

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
  const id = useId();
  const onCardClick = () => (matched || lock ? null : onClick(index));
  return (
    <div
      id={`${id}card`}
      role="button"
      onClick={onCardClick}
      onKeyPress={onCardClick}
      tabIndex="0"
      className={s.card}
    >
      <div className={[s.cardInner, matched || open ? s.open : ''].join(' ')}>
        <div className={s.front} id={`${id}front`} />
        <div className={s.back} id={`${id}back`}>
          <div
            className={[s.backInner, matched ? s.matched : '', notMatched ? s.notMatched : ''].join(
              ' ',
            )}
          >
            <div>
              <CardTop />
            </div>
            <div className={s.cardMiddle} id={`${id}cardMiddle`}>
              <h1>{text}</h1>
            </div>
            <div>
              <CardBottom />
            </div>
            {matched && (
              <div className={s.right} id={`${id}right`}>
                <CheckIcon />
                <span> Right Match</span>
              </div>
            )}
            {notMatched && (
              <div className={s.wrong} id={`${id}wrong`}>
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
