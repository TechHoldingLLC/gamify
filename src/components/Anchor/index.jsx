/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import s from './Anchor.module.scss';

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

const Anchor = ({ className, children, type, theme, size, color, ...props }) => (
  <Link
    type={type}
    className={[s.btn, s[theme], className, s[color], s[size]].join(' ')}
    {...props}
  >
    {children}
  </Link>
);

Anchor.propTypes = propTypes;
Anchor.defaultProps = defaultProps;
export default Anchor;
