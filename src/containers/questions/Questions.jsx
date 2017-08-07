import React, { Component } from 'react'
import Question from './Question'

class Questions extends Component {
  componentWillReceiveProps(newProps){
    console.log(newProps);
  }
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