import React from 'react';
import s from './Footer.module.scss';
import { ReactComponent as LogoIcon } from '../../assets/images/svgs/TH-Logo.svg';

const Footer = () => (
  <div className={s.root}>
    <span className={s.text}>Made with love in &nbsp;</span>
    <LogoIcon />
  </div>
);

export default Footer;
