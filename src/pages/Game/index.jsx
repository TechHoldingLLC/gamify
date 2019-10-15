import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const Game = ({ match }) => <div>{match.params.username}</div>;
Game.propTypes = propTypes;
export default Game;
