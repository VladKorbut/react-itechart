import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'
import QuizzesTable from '../components/QuizzesTable'
import { getQuizzes } from '../actions/getQuizzes'
import Spinner from '../components/Spinner'

class Quizzes extends Component {
  componentDidMount() {
    this.props.get();
  }
  render() {
    return (
      <div>
        {this.props.loading && !this.props.success ?
          <Spinner /> :
          (this.props.quizzes.length ?
            <QuizzesTable data={this.props.quizzes} /> :
            <Alert bsStyle='info'>You're haven't created any quizzes</Alert>)
        }
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    quizzes: store.quizzesReducer.quizzes,
    loading: store.quizzesReducer.loading,
    success: store.quizzesReducer.success,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    get: (my) => getQuizzes(my)(dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quizzes)