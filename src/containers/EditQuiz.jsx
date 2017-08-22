import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import NewQuiz from './NewQuiz';
import Spinner from '../components/Spinner';
import { getQuiz } from '../actions/getQuiz';

const preValidQusetions = (quiz) => {
  if (!Object.keys(quiz).length) return quiz;
  quiz.questions = quiz.questions.map(item => ({ ...item, isValid: true }));
  return quiz;
};

class EditQuiz extends Component {
  componentDidMount() {
    this.props.get(this.props.params.id);
  }
  render() {
    return (this.props.success === null || this.props.loading)
      ? <Spinner /> : <NewQuiz quiz={this.props.quiz} edit />;
  }
}

EditQuiz.propTypes = {
  get: propTypes.func.isRequired,
  success: propTypes.bool,
  loading: propTypes.bool,
  quiz: propTypes.object,
};

const mapStateToProps = store => ({
  quiz: preValidQusetions(store.quizReducer.quiz),
  loading: store.quizReducer.loading,
  success: store.quizReducer.success,
});

const mapDispatchToProps = dispatch => ({
  get: id => getQuiz(id)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditQuiz);
