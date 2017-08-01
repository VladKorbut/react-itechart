import React, { Component } from 'react'
import UsersTable from '../components/UsersTable'
import users from '../db/users'
import processUsers from '../common/processUsers'

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    }
  }
  componentWillMount() {
    users.get().then((users) => {
      this.setState({ users: processUsers(users) });
    });
  }
  render() {
    return (
      <div>
        <UsersTable data={this.state.users} />
      </div>
    )
  }
}

export default Users