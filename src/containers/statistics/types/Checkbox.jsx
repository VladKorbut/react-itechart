import React from 'react'
import { HorizontalBar } from 'react-chartjs-2'

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

function getChartData(options, answers, title) {
  return {
    labels: options.map(option => option.value),
    datasets: [{
      label: title || 'results',
      data: options.map(option => countAnswers(answers, option.id)),
      backgroundColor:
      'rgba(75, 192, 192, 1)',
      borderWidth: 0,
      barPercentage: 1.0,
      categoryPercentage: 0.5,
    }],
    options: {
      responsive:true,
      scaleBeginAtZero:false,
      barBeginAtOrigin:true
    }
  }
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
      <HorizontalBar
        data={getChartData(props.question.options, props.question.answers)}
      />
    </div>
  )
}

export default Checkbox