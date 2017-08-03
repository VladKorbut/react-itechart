import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class QuizzesTable extends Component {
  render() {
    return (
      <BootstrapTable
        data={this.props.data}
        pagination
        responsive>
        <TableHeaderColumn dataField='title' dataSort={ true } isKey>Title</TableHeaderColumn>
      </BootstrapTable>
    )
  }
}

export default QuizzesTable