import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Error404 from './components/Error404';
import Game from './pages/Game';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/game/:username" component={Game} />
        <Route component={Error404} />
      </Switch>
    </Router>
  );
};

export default App;
