import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Error404 from './components/Error404';
import Game from './pages/Game';
import { HOME_PAGE, GAME_PATH, LOGOUT } from './constants/routes';
import withAuthCheck from './hocs/withAuthCheck';
import Logout from './pages/Logout';

const App = () => (
  <Router>
    <Switch>
      <Route exact path={HOME_PAGE} component={withAuthCheck(Login, false)} />
      <Route exact path={GAME_PATH} component={withAuthCheck(Game, true)} />
      <Route exact path={LOGOUT} component={withAuthCheck(Logout, true)} />
      <Route component={Error404} />
    </Switch>
  </Router>
);

export default App;
