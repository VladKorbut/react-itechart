import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import App from './App';
import Register from './containers/Register';
import Login from './containers/Login';
import Users from './containers/Users';
import NewQuiz from './containers/NewQuiz';
import EditQuiz from './containers/EditQuiz';
import Quizzes from './containers/Quizzes';
import Quiz from './containers/Quiz';
import Results from './containers/Results';
import Result from './containers/Result';
import Statistic from './containers/Statistic';
import NotFound from './components/NotFound';
import Home from './components/Home';
import NoRights from './components/NoRights';

import store from './store';

const history = syncHistoryWithStore(browserHistory, store);

const redirectIfNotLogged = (nextState, replace) => {
  if (!store.getState().loginReducer.isLoggedIn) {
    replace({
      pathname: '/login',
    });
  }
};

const redirectIfLogged = (nextState, replace) => {
  if (store.getState().loginReducer.isLoggedIn) {
    replace({
      pathname: '/',
    });
  }
};

const redirectIfNotAdmin = (nextState, replace) => {
  if (!store.getState().loginReducer.isAdmin) {
    replace({
      pathname: '/no-rights',
    });
  }
};

const Routing = (
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="register" component={Register} onEnter={redirectIfLogged} />
      <Route path="login" component={Login} onEnter={redirectIfLogged} />
      <Route path="users" component={Users} onEnter={redirectIfNotAdmin} />
      <Route path="new-quiz" component={NewQuiz} onEnter={redirectIfNotLogged} />
      <Route path="my-quizzes" component={Quizzes} onEnter={redirectIfNotLogged} />
      <Route path="quiz/:id" component={Quiz} />
      <Route path="edit/:id" component={EditQuiz} onEnter={redirectIfNotLogged} />
      <Route path="stat/:id" component={Statistic} onEnter={redirectIfNotLogged} />
      <Route path="results/:id" component={Results} onEnter={redirectIfNotLogged} />
      <Route path="result/:quizResultId" component={Result} onEnter={redirectIfNotLogged} />
      <Route path="no-rights" component={NoRights} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

export default Routing;
