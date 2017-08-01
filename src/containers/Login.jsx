import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { FormGroup, ControlLabel, FormControl, Col, Button } from 'react-bootstrap'
import users from '../db/users'
import getUser from '../db/login'
import storage from '../localStorage/storage'
import { login } from '../actions/login'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      login: '',
      password: '',
      loginIsValid: null,
      passwordIsValid: null,
    }
  }
  componentWillMount(){
    if(this.props.isLoggedIn){
      browserHistory.push('/home');
    }
  }
  submitFrom = () => {
    getUser(this.state.login, this.state.password).then((data) => {
      if (!data.length) {
        alert('Password is incorrect');
        this.setState({ password: '', passwordIsValid: null });
      } else {
        storage.pushUser(data[0].id);
        this.props.login();
        browserHistory.push('/home')
      }
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
          this.setState({ loginIsValid: true });
        } else {
          this.setState({ loginIsValid: false });
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
  getButtonDisableState = (e) => {
    return !(this.state.loginIsValid && this.state.passwordIsValid);
  }
  render() {
    return (
      <Col xs={12} sm={8} smOffset={2} md={6} mdOffset={3}>
        <form>
          <FormGroup validationState={this.getLoginValidationState()}>
            <ControlLabel>Login</ControlLabel>
            <FormControl autoFocus type="text" onChange={this.loginHandler} />
          </FormGroup>
          <FormGroup validationState={this.getPasswordValidationState()}>
            <ControlLabel>Password</ControlLabel>
            <FormControl type="password" onChange={this.passwordHandler} value={this.state.password} />
          </FormGroup>
          <Button bsSize="large" bsStyle='primary' onClick={this.submitFrom} disabled={this.getButtonDisableState()}>Login</Button>
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

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => login()(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)