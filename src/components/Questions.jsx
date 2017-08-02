import React, { Component } from 'react'
import Question from '../containers/questions/Question'

class Questions extends Component {
  render() {
    return (
      <div>
        {
          this.props.questions.map((question, index) => {
            return (<Question key={index} index={index} question={question} addOption={this.props.addOption}/>);
          })
        }
      </div>
    )
  }
}

export default Questions