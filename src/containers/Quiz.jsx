import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { getQuiz } from '../actions/getQuiz'
import Spinner from '../components/Spinner'
//import Questions from './questions/Questions'

class Quiz extends Component {
  componentWillMount() {
    this.props.get(this.props.params.id)
      .then((data) => {
        if (!data) {
          browserHistory.push('/404');
        }
      })
  }



  render() {
    return (
      <div>
        {this.props.quiz.loading ?
          <Spinner />
          : ''
        }
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    quiz: store.quizReducer,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    get: (id) => getQuiz(id)(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)