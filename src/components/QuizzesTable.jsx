import React from 'react'
import { Link } from 'react-router'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Button } from 'react-bootstrap'
import Fa from 'react-fontawesome'
import dc from '../common/dateConverter'

const quizLink = id => {
  return <Link to={'/quiz/' + id}>Link to quiz</Link>
}

const resultsLink = id => {
  return <Link to={'/results/' + id}>Results</Link>
}


const editBtn = (id, row) => {
  return (
    <Link to={'/edit/' + id}>
      <Button disabled={!!row.complete}><Fa name='pencil' /></Button>
    </Link>
  )
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
      <TableHeaderColumn dataField='id' dataFormat={resultsLink}>Results</TableHeaderColumn>
      <TableHeaderColumn dataField='id' dataFormat={quizLink}>Link</TableHeaderColumn>
      <TableHeaderColumn dataField='complete'>Complete</TableHeaderColumn>
      <TableHeaderColumn dataField='id' dataFormat={editBtn}>Options</TableHeaderColumn>
    </BootstrapTable>
  )
}

export default QuizzesTable