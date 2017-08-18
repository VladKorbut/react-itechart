import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

function formatNumber(){
  return arguments[3]+1;
}

function Text(props) {
  return (
    <BootstrapTable striped hover
      data={props.question.answers}
      pagination
      responsive>
      <TableHeaderColumn isKey dataField='value' dataSort>Answer</TableHeaderColumn>
    </BootstrapTable>
  )
}

export default Text