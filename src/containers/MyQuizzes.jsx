import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'
import QuizzesTable from '../components/QuizzesTable'
import { getMyQuizzes } from '../actions/getQuizzes'
import Spinner from '../components/Spinner'

class MyQuizzes extends Component {
  constructor() {
    super();
    this.state = {
      quizzes: [],
    }
  }
  componentDidMount() {
    this.props.getMy();
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
    getMy: () => getMyQuizzes()(dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyQuizzes)