import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class Table extends Component {
  render() {
    return (
      <BootstrapTable
        data={this.props.data}
        pagination
        responsive>
        <TableHeaderColumn isKey dataField='id' width='60'>id</TableHeaderColumn>
        <TableHeaderColumn dataField='login' dataSort={true}>Login</TableHeaderColumn>
        <TableHeaderColumn dataField='date'>Registerd</TableHeaderColumn>
        <TableHeaderColumn dataField='isAdmin' dataSort={true}>Role</TableHeaderColumn>
      </BootstrapTable>
    )
  }
}

export default Table