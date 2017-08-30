import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import QuizzesTable from '../components/QuizzesTable';
import { getQuizzes } from '../actions/getQuizzes';
import Spinner from '../components/Spinner';

class Quizzes extends Component {
  componentDidMount() {
    this.props.get();
  }
  render() {
    return (
      <div>
        {this.props.loading && !this.props.success ?
          <Spinner /> :
          <QuizzesTable data={this.props.quizzes} />
        }
      </div>
    );
  }
}

Quizzes.propTypes = {
  quizzes: propTypes.arrayOf(propTypes.object),
  loading: propTypes.bool,
  success: propTypes.bool,
};

const mapStateToProps = store => ({
  quizzes: store.quizzesReducer.quizzes,
  loading: store.quizzesReducer.loading,
  success: store.quizzesReducer.success,
});

const mapDispatchToProps = dispatch => ({
  get: my => dispatch(getQuizzes(my)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Quizzes);
