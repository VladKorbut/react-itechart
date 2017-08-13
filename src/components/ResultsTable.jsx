import React, { Component } from 'react'
import { Link } from 'react-router'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import dc from '../common/dateConverter'

const formatLink = (id) => {
  return <Link to={'results/' + + id}>Link to quiz</Link>
}

function ResultsTable(props) {
  return (
    <BootstrapTable striped hover
      data={props.data}
      pagination
      responsive>
      <TableHeaderColumn isKey dataField='id' width='60'>#</TableHeaderColumn>
      <TableHeaderColumn dataField='login' dataSort={true}>Login</TableHeaderColumn>
      <TableHeaderColumn dataField='date' dataSort={true} dataFormat={dc.getDDMMYYYY}>Date</TableHeaderColumn>
      <TableHeaderColumn dataField='id' dataFormat={formatLink}>Link</TableHeaderColumn>
    </BootstrapTable>
  );
}

export default ResultsTable;