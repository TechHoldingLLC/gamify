import React from 'react';
import { Redirect } from 'react-router-dom';
import { HOME_PAGE } from '../../constants/routes';

const Logout = () => {
  localStorage.removeItem('user');
  return <Redirect to={HOME_PAGE} />;
};

export default Logout;
