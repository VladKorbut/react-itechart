import React from 'react'
import { Link } from 'react-router'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import dc from '../common/dateConverter'

const fromatLink = (id) => {
  return <Link to={'quiz/' + id}>Link to quiz</Link>
}

function QuizzesTable(props) {
  return (
    <BootstrapTable striped hover
      data={props.data}
      pagination
      responsive>
      <TableHeaderColumn isKey dataField='id' width='60'>#</TableHeaderColumn>
      <TableHeaderColumn dataField='title' dataSort={true}>Title</TableHeaderColumn>
      <TableHeaderColumn dataField='date' dataSort={true} dataFormat={dc.getDDMMYYYY}>Date</TableHeaderColumn>
      <TableHeaderColumn dataField='id' dataFormat={fromatLink}>Link</TableHeaderColumn>
    </BootstrapTable>
  )
}

export default QuizzesTable