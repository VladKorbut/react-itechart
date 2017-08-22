import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
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

const Routing = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="register" component={Register} />
      <Route path="login" component={Login} />
      <Route path="users" component={Users} />
      <Route path="new-quiz" component={NewQuiz} />
      <Route path="my-quizzes" component={Quizzes} />
      <Route path="quiz/:id" component={Quiz} />
      <Route path="edit/:id" component={EditQuiz} />
      <Route path="stat/:id" component={Statistic} />
      <Route path="results/:id" component={Results} />
      <Route path="result/:quizResultId" component={Result} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

export default Routing;
