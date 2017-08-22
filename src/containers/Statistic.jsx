import React, { Component } from 'react'
import StatisticSwitcher from './statistics/StatisticSwitcher'
import Spinner from '../components/Spinner'
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
        console.log(quiz);
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
          : <Spinner />}
      </div>
    )
  }
}

export default Statistic