import React, { useState } from 'react';
import PropTypes from 'prop-types';
import s from './Login.module.scss';
import Input from '../../components/Input';
import Default from '../../layouts/Default';
import Button from '../../components/Button';

const propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

const Login = ({ history }) => {
  const [userName, setUserName] = useState('');
  const handleOnSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({ name: userName }));
    history.push(`/game/${userName}`);
  };

  const handleInputChange = (e) => {
    setUserName(e.target.value);
  };

  return (
    <Default>
      <div className={s.root}>
        <form onSubmit={handleOnSubmit}>
          <Input name="username" value={userName} onChange={handleInputChange} />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </Default>
  );
};

Login.propTypes = propTypes;
export default Login;
