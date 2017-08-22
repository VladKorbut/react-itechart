import React from 'react'
import propTypes from 'prop-types'
import Question from './QuestionSwitcher'
import {Alert} from 'react-bootstrap'

function Questions(props) {
  return (
    <div>
      {
        props.questions.length ?
        props.questions.map((question, index) => {
          return (<Question
            key={index}
            index={index}
            question={question}
            {...props} />);
        })
        :
        <Alert>
          Questions Will Be Displayed Here
        </Alert>
      }
    </div>
  )
}

Question.propTypes = {
  questions: propTypes.arrayOf(propTypes.object),
}

export default Questions