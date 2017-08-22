import React from 'react'
import propTypes from 'prop-types'
import AddQuestions from './AddQuestions'
import QuizParams from './QuizParams'

function Settings(props) {
  return (
    <div>
      <AddQuestions addQuestion={props.addQuestion} />
      <QuizParams
        anonHandler={props.anonHandler}
        isAnon={props.isAnon}
        randHandler={props.randHandler}
        isRand={props.isRand}
      />
    </div>
  )
}

Settings.propTypes = {
  isAnon: propTypes.bool,
  anonHandler: propTypes.func,
  isRand: propTypes.bool,
  randHandler: propTypes.func,
}

export default Settings