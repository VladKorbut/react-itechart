import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import App from './App'
import Register from './containers/Register'
import Login from './containers/Login'
import Home from './containers/Home'

const Routing = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="register" component={Register} />
      <Route path="login" component={Login} />
      <Route path="home" component={Home} />
    </Route>
  </Router>
)

export default Routing