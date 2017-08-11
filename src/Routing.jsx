import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './App'
import Register from './containers/Register'
import Login from './containers/Login'
import Users from './containers/Users'
import NewQuiz from './containers/NewQuiz'
import ModifyQuiz from './containers/ModifyQuiz'
import MyQuizzes from './containers/MyQuizzes'
import Quiz from './containers/Quiz'
import NotFound from './components/NotFound'
import Home from './components/Home'

const Routing = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="register" component={Register} />
      <Route path="login" component={Login} />
      <Route path="users" component={Users} />
      <Route path="new-quiz" component={NewQuiz} />
      <Route path="my-quizzes" component={MyQuizzes} />
      <Route path="quiz/:id" component={Quiz} />
      <Route path="modify/:id" component={ModifyQuiz} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
)

export default Routing