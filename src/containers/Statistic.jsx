import React, { Component } from 'react';
import StatisticSwitcher from './statistics/StatisticSwitcher';
import Spinner from '../components/Spinner';
import result from '../db/result';

class Statistic extends Component {
  constructor() {
    super();
    this.state = {
      quiz: {},
    };
  }

  componentDidMount() {
    result.getStat(this.props.params.id)
      .then((quiz) => {
        this.setState({ quiz });
      });
  }

  render() {
    return (
      <div>
        {Object.keys(this.state.quiz).length ? (
          <div>
            <h1>{this.state.quiz.title}</h1>
            <p>Passed: {this.state.quiz.answers}</p>
            {this.state.quiz.questions.map(question => (
              <StatisticSwitcher
                key={question.id}
                question={question}
                passed={this.state.quiz.answers}
              />
            ))}
          </div>
        ) : <Spinner />}
      </div>
    );
  }
}

export default Statistic;
