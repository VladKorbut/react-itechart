import React, { Component } from 'react'
import { connect } from 'react-redux'
import NewQuiz from './NewQuiz'
import Spinner from '../components/Spinner'
import { getQuiz } from '../actions/getQuiz'

class EditQuiz extends Component {
  componentWillMount(){
    this.props.get(this.props.params.id);
  }
  render() {
    return (this.props.success === null || this.props.loading) ? <Spinner /> : <NewQuiz quiz={this.props.quiz} />
  }
}

const mapStateToProps = (store) => {
  return {
    quiz: store.quizReducer.quiz,
    loading: store.quizReducer.loading,
    success: store.quizReducer.success,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    get: (id) => getQuiz(id)(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditQuiz)