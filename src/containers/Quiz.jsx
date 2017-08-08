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
    return (
      <div>
        {(this.props.data.success === null || this.props.data.loading) ? <Spinner />
          :
          <div>
            <h2>{this.props.data.quiz.title}</h2>
            <Questions questions={this.props.data.quiz.questions} />
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    data: store.quizReducer,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    get: (id) => getQuiz(id)(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)