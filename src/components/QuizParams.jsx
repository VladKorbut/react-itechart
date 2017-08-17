import React from 'react'
import { Checkbox, Row } from 'react-bootstrap'

function QuizParams(props) {
  return (
    <Row>
      <h4>Quiz params</h4>
      <Checkbox checked={props.isAnon} onChange={props.anonHandler}>
        Anonymous quiz
      </Checkbox>
      <Checkbox checked={props.isRand} onChange={props.randHandler}>
        Random Questions
      </Checkbox>
    </Row>
  )
}

export default QuizParams