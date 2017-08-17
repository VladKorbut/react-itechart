import React from 'react'
import { Button, ButtonGroup, Row } from 'react-bootstrap'
import { CHECKBOX, RADIO, STARS, TEXT } from '../types/questions'
import Fa from 'react-fontawesome'

function AddQuestions(props) {
  return (
    <Row>
      <h4>Type Of Question</h4>
      <ButtonGroup vertical>
        <Button onClick={props.addQuestion(CHECKBOX)}><Fa name='check-square-o'></Fa>Multiple choise</Button>
        <Button onClick={props.addQuestion(RADIO)}><Fa name='dot-circle-o'></Fa>Single choise</Button>
        <Button onClick={props.addQuestion(STARS)}><Fa name='star-half-o'></Fa>Stars rating</Button>
        <Button onClick={props.addQuestion(TEXT)}><Fa name='font'></Fa>Text input</Button>
      </ButtonGroup>
    </Row>
  )
}

export default AddQuestions