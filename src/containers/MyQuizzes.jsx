import React, { Component } from 'react'
import { connect } from 'react-redux'
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
  componentWillMount() {
    this.props.getMy();
  }
  render() {
    return (
      <div>
        {this.props.loading ? <Spinner /> : <QuizzesTable data={this.props.quizzes} />}
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