import React, { Component } from 'react'
import { Router, Route, browserHistory } from 'react-router'
import App from './App'
import Register from './containers/Register.jsx'
import Login from './containers/Login.jsx'

class Routing extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <Route path="register" component={Register} />
          <Route path="login" component={Login} />
        </Route>
      </Router>
    )
  }
}

export default Routing