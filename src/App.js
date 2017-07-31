import React, { Component } from 'react';
import { Navbar, Nav, Grid, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router'
class App extends Component {
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
            <Nav pullRight>
              <LinkContainer to={'/register'}>
                <NavItem>Register</NavItem>
              </LinkContainer>
              <LinkContainer to={'/login'}>
                <NavItem>Login</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Grid bsClass='container'>
          {this.props.children}
        </Grid>
      </div>
    );
  }
}

export default App;
