import React, { Component } from 'react'
import { Link } from 'react-router'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const fromatLink = (id) => {
  return <Link to={'quiz/' + id}>Link to quiz</Link>
}

class QuizzesTable extends Component {
  render() {
    return (
      <BootstrapTable striped hover
        data={this.props.data}
        pagination
        responsive>
        <TableHeaderColumn dataField='id' isKey width='60'>id</TableHeaderColumn>
        <TableHeaderColumn dataField='title' dataSort={true}>Title</TableHeaderColumn>
        <TableHeaderColumn dataField='date'>Date</TableHeaderColumn>
        <TableHeaderColumn dataField='id' dataFormat={fromatLink}>Link</TableHeaderColumn>
      </BootstrapTable>
    )
  }
}

export default QuizzesTable