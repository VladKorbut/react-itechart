import React, { Component } from 'react'
import StatisticSwitcher from './statistics/StatisticSwitcher'
import result from '../db/result'

class Statistic extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      questions: [],
    }
  }
  componentDidMount() {
    result.getStat(this.props.params.id)
      .then(quiz => {
        this.setState({
          title: quiz.title,
          questions: quiz.questions,
        });
      })
  }

  render() {
    return (
      <div>
        {this.state.questions.length ?
          this.state.questions.map(question => <StatisticSwitcher key={question.id} question={question} />)
          : null}
      </div>
    )
  }
}



export default Statistic