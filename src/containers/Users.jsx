import React, { Component } from 'react'
import { connect } from 'react-redux'
import UsersTable from '../components/UsersTable'
import { getUsers } from '../actions/getUsers'
import Spinner from '../components/Spinner'

class Users extends Component {
  componentWillMount() {
    this.props.get();
  }
  render() {
    return (
      <div>
        {this.props.loading ? <Spinner /> : <UsersTable data={this.props.users} />}
      </div>
    )
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