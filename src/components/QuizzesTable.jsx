import React from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Button } from 'react-bootstrap'
import Fa from 'react-fontawesome'
import dc from '../common/dateConverter'

const quizLink = id => {
  return <Link to={'/quiz/' + id}>Link to quiz</Link>
}

const resultsLink = (id, row) => {
  if (!row.answers) { return null }
  return <Link to={'/results/' + id}>Results</Link>
}

const statLink = (id, row) => {
  if (!row.answers) { return null }
  return <Link to={'/stat/' + id}>Statistics</Link>
}


const editBtn = (id, row) => {
  return (
    <Link to={'/edit/' + id}>
      <Button disabled={!!row.answers}><Fa name='pencil' /></Button>
    </Link>
  )
}

function QuizzesTable(props) {
  return (
    <BootstrapTable striped hover
      data={props.data}
      pagination
      responsive>
      <TableHeaderColumn isKey dataField='id' dataSort width='40'>#</TableHeaderColumn>
      <TableHeaderColumn dataField='title' dataSort>Title</TableHeaderColumn>
      <TableHeaderColumn dataField='answers' dataSort>Answers</TableHeaderColumn>
      <TableHeaderColumn dataField='date' dataSort dataFormat={dc.getDDMMYYYY}>Date</TableHeaderColumn>
      <TableHeaderColumn dataField='id' dataFormat={statLink}>Statistic</TableHeaderColumn>
      <TableHeaderColumn dataField='id' dataFormat={resultsLink}>Results</TableHeaderColumn>
      <TableHeaderColumn dataField='id' dataFormat={quizLink}>Link</TableHeaderColumn>
      <TableHeaderColumn dataField='id' dataFormat={editBtn}>Options</TableHeaderColumn>
    </BootstrapTable>
  )
}

QuizzesTable.propTypes = {
  data: propTypes.arrayOf(propTypes.object)
}

export default QuizzesTable