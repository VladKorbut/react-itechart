import React, { Component } from 'react'
import { Link } from 'react-router'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import dc from '../common/dateConverter'

const formatLink = (id) => {
  return <Link to={'quiz/' + id}>Link to quiz</Link>
}

const formatIndex = (х, у, й, index) => {
  return index + 1;
}

class QuizzesTable extends Component {
  render() {
    return (
      <BootstrapTable striped hover
        data={this.props.data}
        pagination
        responsive>
        <TableHeaderColumn isKey dataField='id' dataFormat={formatIndex} width='60'>#</TableHeaderColumn>
        <TableHeaderColumn dataField='title' dataSort={true}>Title</TableHeaderColumn>
        <TableHeaderColumn dataField='date' dataSort={true} dataFormat={dc.getDDMMYYYY}>Date</TableHeaderColumn>
        <TableHeaderColumn dataField='id' dataFormat={formatLink}>Link</TableHeaderColumn>
      </BootstrapTable>
    )
  }
}

export default QuizzesTable