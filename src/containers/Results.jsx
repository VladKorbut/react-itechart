import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { getResults } from '../actions/getResults';
import ResultsTable from '../components/ResultsTable';
import Spinner from '../components/Spinner';

class Results extends Component {
  componentDidMount() {
    this.props.get(this.props.params.id);
  }

  render() {
    return !this.props.success || this.props.loading ? <Spinner />
      : <ResultsTable quizId={this.props.params.id} data={this.props.results} />;
  }
}

Results.propTypes = {
  results: propTypes.array,
  loading: propTypes.bool,
  success: propTypes.bool,
};

const mapStateToProps = store => ({
  results: store.resultsReducer.results,
  loading: store.resultsReducer.loading,
  success: store.resultsReducer.success,
});

const mapDispatchToProps = dispatch => ({
  get: quizId => getResults(quizId)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
