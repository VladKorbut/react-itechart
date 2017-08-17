import React from 'react'
import { HorizontalBar } from 'react-chartjs-2'
import getChartData, { percentageOptions } from '../../../common/graphs'

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
      <HorizontalBar
        data={getChartData(props.question, countAnswers, 'blue')}
        options={percentageOptions}
      />
    </div>
  )
}

export default Checkbox