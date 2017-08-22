import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import UsersTable from '../components/UsersTable';
import { getUsers } from '../actions/getUsers';
import Spinner from '../components/Spinner';

class Users extends Component {
  componentWillMount() {
    if (!this.props.user.isAdmin) {
      browserHistory.push('/404');
    }
  }
  componentDidMount() {
    this.props.get();
  }
  render() {
    return this.props.loading && this.props.users && !this.props.users.length ?
      <Spinner /> :
      <UsersTable data={this.props.users} reload={this.props.get} />;
  }
}

Users.propTypes = {
  users: propTypes.array,
  loading: propTypes.bool,
  user: propTypes.object,
};

const mapStateToProps = store => ({
  users: store.usersReducer.users,
  loading: store.usersReducer.loading,
  user: store.loginReducer,
});

const mapDispatchToProps = dispatch => ({
  get: () => getUsers()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
