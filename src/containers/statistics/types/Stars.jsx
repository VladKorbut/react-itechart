import React from 'react'

const countAnswers = (answers, value) => {
  let count = 0;
  answers.forEach(item => {
    if (item.value === value) {
      ++count;
    }
  })
  return count;
}

function Stars(props) {
  return (
    <div>
      <h4>{props.question.title}</h4>
      <ul>
        {
          [1, 2, 3, 4, 5].map((item, i) => {
            return <li key={i}>{item} - {countAnswers(props.question.answers, item)}</li>
          })
        }
      </ul>
    </div>
  )
}

export default Stars