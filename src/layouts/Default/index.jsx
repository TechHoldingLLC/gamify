import React from 'react';
import PropTypes from 'prop-types';
import s from './Default.module.scss';
import Footer from '../../components/Footer';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const Default = ({ children }) => {
  return (
    <div className={s.bg}>
      {children}
      <Footer />
    </div>
  );
};
Default.propTypes = propTypes;
export default Default;
