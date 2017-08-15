import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getResults } from '../actions/getResults'
import ResultsTable from '../components/ResultsTable'
import Spinner from '../components/Spinner'

class Results extends Component {
  componentDidMount() {
    this.props.get(this.props.params.id);
  }

  render() {
    return !this.props.success || this.props.loading ? <Spinner /> : <ResultsTable quizId={this.props.params.id} data={this.props.results} />
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