import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import Button from '../Button';
import s from './AlertModal.module.scss';

const customStyles = {
  content: {
    width: '50%',
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '50px 50px',
    borderRadius: '10px',
    fontSize: '25px',
    lineHeight: '30px',
    textAlign: 'center',
    overflow: 'unset',
  },
};

ReactModal.defaultStyles.overlay.backgroundColor = 'transparent';
ReactModal.defaultStyles.overlay.top = '60px';
ReactModal.setAppElement('body');

const propTypes = {
  username: PropTypes.string.isRequired,
  btnLabel: PropTypes.string.isRequired,
  desc1: PropTypes.string.isRequired,
  desc2: PropTypes.string,
  btnOnClick: PropTypes.func.isRequired,
  title: PropTypes.string,
  isOpen: PropTypes.bool,
};

const defaultProps = {
  title: null,
  isOpen: false,
  desc2: null,
};

const AlertModal = ({ username, title, btnLabel, btnOnClick, desc1, desc2, isOpen }) => {
  return (
    <ReactModal
      id={btnLabel}
      style={customStyles}
      isOpen={isOpen}
      onAfterOpen={null}
      contentLabel=""
      shouldCloseOnOverlayClick={false}
    >
      <h2 className={s.modalTitle}>
        <span>{`Hi ${username}`}</span>
      </h2>
      {title && <p>{title}</p>}
      <p>
        {desc1}
        <br />
        {desc2}
      </p>
      <Button
        data-testid="playButton"
        size="lg"
        color="success"
        className={s.playButton}
        onClick={btnOnClick}
      >
        {btnLabel}
      </Button>
    </ReactModal>
  );
};

AlertModal.propTypes = propTypes;
AlertModal.defaultProps = defaultProps;
export default AlertModal;
