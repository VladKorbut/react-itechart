import React from 'react'
import { Link } from 'react-router'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import dc from '../common/dateConverter'

function ResultsTable(props) {
  const formatLink = (id) => {
    return <Link to={'/results/' + props.quizId +'/user/'+ id}>Show Answers</Link>
  }
  return (
    <BootstrapTable striped hover
      data={props.data}
      pagination
      responsive>
      <TableHeaderColumn isKey dataField='id' width='60'>#</TableHeaderColumn>
      <TableHeaderColumn dataField='login' dataSort>Login</TableHeaderColumn>
      <TableHeaderColumn dataField='date' dataSort dataFormat={dc.getDDMMYYYY}>Date</TableHeaderColumn>
      <TableHeaderColumn dataField='id' dataSort dataFormat={formatLink}>Answers</TableHeaderColumn>
    </BootstrapTable>
  );
}

export default ResultsTable;