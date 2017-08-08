import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class QuizzesTable extends Component {
  redirectToQuiz = (row) => {
    browserHistory.push('quiz/'+row.id);
  }
  render() {
    const options = {
      onRowClick: this.redirectToQuiz
    }
    return (
      <BootstrapTable striped hover
        data={this.props.data}
        pagination
        responsive
        options={options}>
        <TableHeaderColumn isKey dataField='title' dataSort={true}>Title</TableHeaderColumn>
        <TableHeaderColumn dataField='date'>Date</TableHeaderColumn>
      </BootstrapTable>
    )
  }
}

export default QuizzesTable