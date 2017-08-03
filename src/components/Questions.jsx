import React, { Component } from 'react'
import Question from '../containers/questions/Question'

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
              setOptions={this.props.setOptions}
              titleHandler={this.props.titleHandler}
              requiredHandler={this.props.requiredHandler}
              deleteQuestion={this.props.deleteQuestion} />);
          })
        }
      </div>
    )
  }
}

export default Questions