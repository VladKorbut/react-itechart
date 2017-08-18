import React from 'react'
import { Bar } from 'react-chartjs-2'
import getChartData, { percentage } from '../../../common/graphs'

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
      <Bar
        data={getChartData(props.question, countAnswers, 'blue')}
        options={percentage}
      />
    </div>
  )
}

export default Checkbox