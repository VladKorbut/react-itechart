import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuizzesTable from '../components/QuizzesTable'
import { getMyQuizzes } from '../actions/getQuizzes'

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
        {this.props.loading ? 'loading...' : <QuizzesTable data={this.props.quizzes} />}
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    quizzes: store.quizReducer.quizzes,
    loading: store.quizReducer.loading,
    success: store.quizReducer.success,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMy: () => getMyQuizzes()(dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyQuizzes)