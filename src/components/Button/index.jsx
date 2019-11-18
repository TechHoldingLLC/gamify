/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.scss';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  theme: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
};

const defaultProps = {
  className: '',
  type: 'button',
  theme: 'default',
  size: '',
  color: '',
};

const Button = ({ className, children, type, theme, size, color, ...props }) => (
  <button
    type={type}
    className={[s.btn, s[theme], className, s[color], s[size]].join(' ')}
    {...props}
  >
    {children}
  </button>
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
export default Button;
