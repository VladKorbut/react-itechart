import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { FormGroup, ControlLabel, FormControl, Col, Button, Checkbox } from 'react-bootstrap'
import register from '../db/register'
import users from '../db/users.js'

class Register extends Component {
  constructor() {
    super();
    this.state = {
      login: '',
      email: '',
      password: '',
      isAdmin: false,
      loginIsValid: null,
      emailIsValid: null,
      passwordIsValid: null,
    }
  }
  componentWillMount(){
    if(this.props.isLoggedIn){
      browserHistory.push('/home');
    }
  }
  submitFrom = () => {
    register(
      this.state.login,
      this.state.email,
      this.state.password,
      this.state.isAdmin
    ).then(() => {
      alert(`You're successfuly registered!`);
      this.setState({
        login: '',
        email: '',
        password: '',
        isAdmin: false,
        loginIsValid: null,
        emailIsValid: null,
        passwordIsValid: null,
      })
      browserHistory.push('/login');
    })
  }
  loginHandler = (e) => {
    this.setState({ login: e.target.value });
    this.loginValidate(e.target.value);
  }
  loginValidate = (login) => {
    if (login.length) {
      users.getUserByLogin(login).then((data) => {
        if (data.length) {
          this.setState({ loginIsValid: false });
        } else {
          this.setState({ loginIsValid: true });
        }
      });
    } else {
      this.setState({ loginIsValid: false });
    }
  }
  getLoginValidationState = () => {
    if (this.state.loginIsValid === null) return null;
    return (this.state.loginIsValid ? 'success' : 'error');
  }
  emailHandler = (e) => {
    this.setState({ email: e.target.value });
    this.emailValidate(e.target.value);
  }
  emailValidate = (email) => {
    if (email.length) {
      users.getUserByEmail(email).then((data) => {
        if (data.length) {
          this.setState({ emailIsValid: false });
        } else {
          this.setState({ emailIsValid: true });
        }
      });
    } else {
      this.setState({ emailIsValid: false });
    }
  }
  getEmailValidationState = () => {
    if (this.state.emailIsValid === null) return null;
    return (this.state.emailIsValid ? 'success' : 'error');
  }
  passwordHandler = (e) => {
    this.setState({ password: e.target.value });
    if (e.target.value) {
      this.setState({ passwordIsValid: true });
    } else {
      this.setState({ passwordIsValid: false });
    }
  }
  getPasswordValidationState = () => {
    if (this.state.passwordIsValid === null) return null;
    return (this.state.passwordIsValid ? 'success' : 'error');
  }
  checkboxHandler = (e) => {
    this.setState({ isAdmin: e.target.checked });
  }
  getButtonDisableState = (e) => {
    return !(this.state.emailIsValid && this.state.loginIsValid && this.state.passwordIsValid);
  }
  render() {
    return (
      <Col xs={12} sm={8} smOffset={2} md={6} mdOffset={3}>
      <form>
        <FormGroup validationState={this.getLoginValidationState()}>
          <ControlLabel>Login</ControlLabel>
          <FormControl autoFocus type="text" onChange={this.loginHandler} value={this.state.login} />
        </FormGroup>
        <FormGroup validationState={this.getEmailValidationState()}>
          <ControlLabel>Email</ControlLabel>
          <FormControl type="email" onChange={this.emailHandler} value={this.state.email} />
        </FormGroup>
        <FormGroup validationState={this.getPasswordValidationState()}>
          <ControlLabel>Password</ControlLabel>
          <FormControl type="password" onChange={this.passwordHandler} value={this.state.password} />
        </FormGroup>
        <FormGroup>
          <Checkbox onChange={this.checkboxHandler} checked={this.state.isAdmin}>
            Are you admin?
          </Checkbox>
          <Button bsSize="large" bsStyle='primary' onClick={this.submitFrom} disabled={this.getButtonDisableState()}>Register</Button>
        </FormGroup>
        </form>
      </Col>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    isLoggedIn: store.loginReducer
  }
}

export default connect(mapStateToProps, null)(Register)