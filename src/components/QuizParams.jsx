import React from 'react'
import propTypes from 'prop-types'
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

QuizParams.propTypes = {
  isAnon: propTypes.bool,
  randHandler: propTypes.func,
}

export default QuizParams