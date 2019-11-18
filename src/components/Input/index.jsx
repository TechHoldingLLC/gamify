/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import s from './Input.module.scss';

const propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  isError: PropTypes.bool,
  errorText: PropTypes.node,
};

const defaultProps = {
  errorText: '',
  isError: false,
  label: '',
  name: '',
  type: 'text',
};

const Input = ({ type, isError, errorText, name, label, ...props }) => (
  <div className={s.inputContainer}>
    <span>{label}</span>
    <label className={s.labelTxt} htmlFor={name}>
      <input
        type={type}
        className={[s.inputTxt, isError ? s.error : ''].join(' ')}
        name={name}
        {...props}
      />
    </label>
    {isError && errorText && <span className={s.errorText}>{errorText}</span>}
  </div>
);

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;
export default Input;
