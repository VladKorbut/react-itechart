import React, { Component } from 'react'
import { connect } from 'react-redux'
import UsersTable from '../components/UsersTable'
import { getUsers } from '../actions/getUsers'
import Spinner from '../components/Spinner'

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: null,
    }
  }
  componentWillMount() {
    this.props.get();
  }
  componentWillReceiveProps(props) {
    if (props.users) {
      this.setState({ users: props.users });
    }
  }
  render() {
    return this.state.users && !this.state.users.length ? <Spinner /> : <UsersTable data={this.props.users} reload={this.props.get} />
  }
}

const mapStateToProps = (store) => {
  return {
    users: store.usersReducer.users,
    loading: store.usersReducer.loading,
    success: store.usersReducer.success,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    get: () => getUsers()(dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)