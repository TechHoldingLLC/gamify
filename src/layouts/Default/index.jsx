import React from 'react';
import s from './Default.module.scss';
import Footer from '../../components/Footer';

const Default = ({ children }) => {
  return (
    <div className={s.bg}>
      {children}
      <Footer />
    </div>
  );
};

export default Default;
