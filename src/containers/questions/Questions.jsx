import React from 'react'
import Question from './Question'

function Questions(props) {
  return (
    <div>
      {
        props.questions.map((question, index) => {
          return (<Question
            key={index}
            index={index}
            question={question}
            {...props} />);
        })
      }
    </div>
  )
}

export default Questions