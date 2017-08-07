import React, { Component } from 'react'
import Question from './questions/Question'

class Questions extends Component {
  render() {
    return (
      <div>
        {
          this.props.questions.map((question, index) => {
            return (<Question
              key={index}
              index={index}
              question={question}
              {...this.props} />);
          })
        }
      </div>
    )
  }
}

export default Questions