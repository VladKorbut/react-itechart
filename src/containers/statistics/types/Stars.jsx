import React from 'react'
import { HorizontalBar } from 'react-chartjs-2'

const countAnswers = (answers, value) => {
  let count = 0;
  answers.forEach(item => {
    if (item.value === value) {
      ++count;
    }
  })
  return count;
}

function getChartData(options, answers, title) {
  return {
    labels: options.map(option => option),
    datasets: [{
      label: title || 'results',
      data: options.map(option => countAnswers(answers, option)),
      backgroundColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 0,
      barPercentage: 1.0,
      categoryPercentage: 0.5,
    }],
    options: {
      responsive: true,
      scaleBeginAtZero: false,
      barBeginAtOrigin: true
    }
  }
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
      <HorizontalBar
        data={getChartData([1, 2, 3, 4, 5], props.question.answers)}
      />
    </div>
  )
}

export default Stars