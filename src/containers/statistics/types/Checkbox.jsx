import React from 'react'

const countAnswers = (answers, optionId) => {
  let count = 0;
  answers.forEach(item => {
    item.value.forEach(value => {
      if (value === optionId) {
        ++count;
      }
    })
  })
  return count;
}

function Checkbox(props) {
  console.log(props);
  return (
    <div>
      <h4>{props.question.title}</h4>
      <ul>
        {
          props.question.options.map((option, i) => {
            return <li key={i}>{option.value} - {countAnswers(props.question.answers, option.id)}</li>
          })
        }
      </ul>
    </div>
  )
}

export default Checkbox