import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import App from './App'
import Register from './containers/Register'
import Login from './containers/Login'
import Home from './components/Home'
import Users from './containers/Users'
import NewQuiz from './containers/NewQuiz'
import MyQuizzes from './containers/MyQuizzes'
import NotFound from './components/NotFound'

const Routing = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="home" component={Home} />
      <Route path="register" component={Register} />
      <Route path="login" component={Login} />
      <Route path="users" component={Users} />
      <Route path="new-quiz" component={NewQuiz} />
      <Route path="my-quizzes" component={MyQuizzes} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
)

export default Routing