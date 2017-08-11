import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Button } from 'react-bootstrap'
import Fa from 'react-fontawesome'
import dc from '../common/dateConverter'
import users from '../db/users'

const formatRole = (isAdmin) => {
  return isAdmin ? 'Admin' : 'User';
}

const cellEditProp = {
  mode: 'click',
  blurToSave: true
};

class Table extends Component {
  editButtons = (id) => {
    return (
      this.props.user.id !== id ?
        <Button bsStyle='danger' onClick={this.deleteUser(id)}><Fa name='times' /></Button>
        : null
    )
  }
  deleteUser = (id) => (e) => {
    users.deleteUser(id).then(() => {
      this.props.reload();
    })
  }
  render() {
    return (
      <BootstrapTable
        data={this.props.data}
        pagination
        responsive
        cellEdit={cellEditProp}
      >
        <TableHeaderColumn isKey dataField='id' width='60'>id</TableHeaderColumn>
        <TableHeaderColumn dataField='login' dataSort={true}>Login</TableHeaderColumn>
        <TableHeaderColumn dataField='date' dataSort dataFormat={dc.getDDMMYYYY}>Registerd</TableHeaderColumn>
        <TableHeaderColumn dataField='isAdmin'  dataSort={true} editable={{ type: 'checkbox', options: { values: 'Admin:User' } }}>Role</TableHeaderColumn>
        <TableHeaderColumn dataField='id' dataFormat={this.editButtons} >Setting</TableHeaderColumn>
      </BootstrapTable>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    user: store.loginReducer
  }
}

export default connect(mapStateToProps, null)(Table)