import React from 'react'
import { Pie } from 'react-chartjs-2';

const countAnswers = (answers, optionId) => {
  let count = 0;
  answers.forEach(item => {
    if (item.value === optionId) {
      ++count;
    }
  })
  return count;
}

function getChartData(options, answers) {
  console.log(options.map(option=>option.value))
  return {
    labels: options.map(option=>option.value),
    datasets: [{
      data: options.map(option=>countAnswers(answers, option.id)),
      backgroundColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 0,
      barPercentage: 1.0
    }]
  }
}

function Radio(props) {
  return (
    <div>
      <h4>{props.question.title}</h4>
      <ul>
        {
          props.question.options.map(option => {
            return <li key={option.id}>{option.value} - {countAnswers(props.question.answers, option.id)}</li>
          })
        }
      </ul>
      <Pie height={80} data={getChartData(props.question.options, props.question.answers)} />
    </div>
  )
}

export default Radio