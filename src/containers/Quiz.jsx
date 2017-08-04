import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import quiz from '../db/quiz'

class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      quiz: {}
    }
  }
  componentWillMount() {
    quiz.getSingle(this.props.params.id)
      .then((quizResult) => {
        if (quizResult.rows.length) {
          this.setState({ quiz: quizResult.rows[0] })
          return quiz.getQuestions(quizResult.rows[0].id);
        } else {
          browserHistory.push('/404');
        }
      })
      .then((questions) => {
        //console.log([...questions.rows]);
      })
  }
  render() {
    return (
      <div>
        <h1>Quiz: {this.state.quiz.title}</h1>
      </div>
    )
  }
}

export default Quiz