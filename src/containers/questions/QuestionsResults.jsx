import React from 'react'
import QuestionResult from './QuestionResult'

function QuestionResults(props) {
  return (
    <div>
      {
        props.questions.map((question, index) => {
          return (<QuestionResult
            key={index}
            index={index}
            question={question}
          />);
        })
      }
    </div>
  )
}


export default QuestionResults