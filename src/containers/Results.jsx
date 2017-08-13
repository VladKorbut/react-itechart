import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getResults } from '../actions/getResults'
import ResultsTable from '../components/ResultsTable'
import Spinner from '../components/Spinner'

class Results extends Component {
  componentWillMount() {
    this.props.get(this.props.params.id);
  }

  render() {
    return (
      <div>
        <span>{this.props.params.id}</span>
        {!this.props.success || this.props.loading ? <Spinner /> : <ResultsTable data={this.props.results} />}
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    results: store.resultsReducer.results,
    loading: store.resultsReducer.loading,
    success: store.resultsReducer.success,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    get: (quizId) => getResults(quizId)(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results)