import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Button } from 'react-bootstrap'
import Fa from 'react-fontawesome'
import dc from '../common/dateConverter'

const formatRole = (isAdmin) => {
  return isAdmin ? 'Admin' : 'User';
}

class Table extends Component {
  editButtons = (id) => {
    return (
      <div>
        <Button bsStyle='info'><Fa name='pencil' /></Button>
        {this.props.user.id !== id ? <Button bsStyle='danger'><Fa name='times' /></Button> : null}
      </div>
    )
  }
  render() {
    return (
      <BootstrapTable
        data={this.props.data}
        pagination
        responsive>
        <TableHeaderColumn isKey dataField='id' width='60'>id</TableHeaderColumn>
        <TableHeaderColumn dataField='login' dataSort={true}>Login</TableHeaderColumn>
        <TableHeaderColumn dataField='date' dataSort dataFormat={dc.getDDMMYYYY}>Registerd</TableHeaderColumn>
        <TableHeaderColumn dataField='isAdmin' dataFormat={formatRole} dataSort={true} >Role</TableHeaderColumn>
        {/*<TableHeaderColumn dataField='id' dataFormat={this.editButtons}>Setting</TableHeaderColumn>*/}
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