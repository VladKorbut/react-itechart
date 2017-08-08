import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { getQuiz } from '../actions/getQuiz'
import Spinner from '../components/Spinner'
import Questions from './questions/Questions'

class Quiz extends Component {
  componentWillMount() {
    this.props.get(this.props.params.id)
      .catch((error) => {
        browserHistory.push('/404');
      })
  }

  render() {
    const randomizeArray = (arr) => arr.sort(() => (Math.random() - 0.5))
    return (
      <div>
        {(this.props.success === null || this.props.loading) ? <Spinner />
          :
          <div>
            <h2>{this.props.quiz.title}</h2>
            <Questions questions={this.props.quiz.isRand ? randomizeArray(this.props.quiz.questions) : this.props.quiz.questions} />
          </div>
        }
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)