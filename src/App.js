import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navbar, Nav, Grid, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router'
import { logout } from './actions/login'
import storage from './localStorage/storage'

class App extends Component {
  logout = () => {
    storage.removeUser();
    console.log(this)
    this.props.logout();
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
              <Navbar.Text pullRight>
                <Navbar.Link onClick={this.logout}>Logout</Navbar.Link>
              </Navbar.Text>
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
          {this.props.children}
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
