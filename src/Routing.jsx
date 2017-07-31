import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import App from './App'
import Register from './containers/Register.jsx'
import Login from './containers/Login.jsx'

const Routing = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="register" component={Register} />
      <Route path="login" component={Login} />
    </Route>
  </Router>
)

export default Routing