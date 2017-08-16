import React, { Component } from 'react'
import result from '../db/result'
import QuestionsResults from './questions/QuestionsResults'
import Spinner from '../components/Spinner'

class Result extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      questions: []
    }
  }
  componentDidMount() {
    result.getResult(this.props.params.quizId, this.props.params.userId)
      .then(quiz => {
        this.setState({
          questions: quiz.questions
        });
      })
  }
  render() {
    console.log(this.state)
    return (
      <div>
        {this.state.questions && this.state.questions.length ? <QuestionsResults questions={this.state.questions} /> : <Spinner />}
      </div>
    )
  }
}

export default Result