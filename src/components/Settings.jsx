import React from 'react'
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

export default Settings