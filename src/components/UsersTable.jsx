import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Button, Checkbox } from 'react-bootstrap'
import Fa from 'react-fontawesome'
import dc from '../common/dateConverter'
import users from '../db/users'

function UserTable(props) {
  const editButtons = (id) => {
    return (
      props.user.id !== id ?
        <Button bsStyle='danger' onClick={deleteUser(id)}><Fa name='times' /></Button>
        : null
    )
  }
  const deleteUser = (id) => (e) => {
    users.deleteUser(id).then(() => {
      props.reload();
    })
  }

  const roleFormat = (isAdmin, row) => {
    return (
      <Checkbox
        checked={isAdmin}
        onChange={roleHandler(row.id)}
        disabled={props.user.id === row.id}
      />
    )
  }

  const roleHandler = (id) => (e) => {
    users.changeRole(id, e.target.checked).then(() => {
      props.reload();
    });
  }
  return (
    <BootstrapTable
      data={props.data}
      pagination
      responsive
    >
      <TableHeaderColumn isKey dataField='id' width='60'>id</TableHeaderColumn>
      <TableHeaderColumn dataField='login' dataSort>Login</TableHeaderColumn>
      <TableHeaderColumn dataField='date' dataSort dataFormat={dc.getDDMMYYYY}>Registerd</TableHeaderColumn>
      <TableHeaderColumn dataField='isAdmin' dataSort dataFormat={roleFormat}>Admin</TableHeaderColumn>
      <TableHeaderColumn dataField='id' dataFormat={editButtons} >Setting</TableHeaderColumn>
    </BootstrapTable>
  )
}

UserTable.propTypes = {
  user: propTypes.object,
  data: propTypes.arrayOf(propTypes.object),
}

const mapStateToProps = (store) => {
  return {
    user: store.loginReducer
  }
}

export default connect(mapStateToProps, null)(UserTable)