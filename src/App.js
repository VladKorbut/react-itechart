import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { Navbar, Nav, Grid, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router'
import { logout } from './actions/login'
import Home from './components/Home'
import storage from './localStorage/storage'

class App extends Component {
  componentWillReceiveProps() {
    this.setState({ login: storage.getUser().login })
  }
  constructor() {
    super();
    this.state = {
      login: storage.getUser().login,
    }
  }
  logout = () => {
    storage.removeUser();
    this.props.logout();
    browserHistory.push('/login');
  }
  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to={'/'}>
                iTechArt
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            {this.props.userIsAuthorized ?
              <div>
                <Nav>
                  <LinkContainer to={'/new-quiz'}>
                    <NavItem>Create Quiz</NavItem>
                  </LinkContainer>
                  <LinkContainer to={'/my-quizzes'}>
                    <NavItem>My Quizzes</NavItem>
                  </LinkContainer>
                  <LinkContainer to={'/users'}>
                    <NavItem>Users</NavItem>
                  </LinkContainer>
                </Nav>
                <Navbar.Text pullRight>
                  Hello, {this.state.login} <Navbar.Link onClick={this.logout}>Logout</Navbar.Link>
                </Navbar.Text>
              </div>
              :
              <Nav pullRight>
                <LinkContainer to={'/login'}>
                  <NavItem>Login</NavItem>
                </LinkContainer>
                <LinkContainer to={'/register'}>
                  <NavItem>Register</NavItem>
                </LinkContainer>
              </Nav>
            }
          </Navbar.Collapse>
        </Navbar>
        <Grid bsClass='container'>
          {this.props.children || <Home />}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    userIsAuthorized: store.loginReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => logout()(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
