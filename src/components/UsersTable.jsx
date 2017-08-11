import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Button, Checkbox } from 'react-bootstrap'
import Fa from 'react-fontawesome'
import dc from '../common/dateConverter'
import users from '../db/users'

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

  roleFormat = (isAdmin, row) => {
    return (
      <Checkbox
        checked={isAdmin}
        onChange={this.roleHandler(row.id)}
        disabled={this.props.user.id === row.id}
      />
    )
  }

  roleHandler = (id) => (e) => {
    users.changeRole(id, e.target.checked).then(() => {
      this.props.reload();
    });
  }
  render() {
    return (
      <BootstrapTable
        data={this.props.data}
        pagination
        responsive
      >
        <TableHeaderColumn isKey dataField='id' width='60'>id</TableHeaderColumn>
        <TableHeaderColumn dataField='login' dataSort={true}>Login</TableHeaderColumn>
        <TableHeaderColumn dataField='date' dataSort dataFormat={dc.getDDMMYYYY}>Registerd</TableHeaderColumn>
        <TableHeaderColumn dataField='isAdmin' dataSort={true} dataFormat={this.roleFormat}>Admin</TableHeaderColumn>
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