import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import UsersTable from '../components/UsersTable'
import { getUsers } from '../actions/getUsers'
import Spinner from '../components/Spinner'

class Users extends Component {
  componentWillMount(){
    if(!this.props.user.isAdmin){
      browserHistory.push('/404')
    }
  }
  componentDidMount() {
    this.props.get();
  }
  render() {
    return this.props.loading && this.props.users && !this.props.users.length ?
      <Spinner /> :
      <UsersTable data={this.props.users} reload={this.props.get} />
  }
}

const mapStateToProps = (store) => {
  return {
    users: store.usersReducer.users,
    loading: store.usersReducer.loading,
    success: store.usersReducer.success,
    user: store.loginReducer,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    get: () => getUsers()(dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)