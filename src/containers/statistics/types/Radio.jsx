import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import getChartData from '../../../common/graphs';

const countAnswers = (answers, optionId) => {
  let count = 0;
  answers.forEach((item) => {
    if (item.value === optionId) {
      ++count;
    }
  });
  return count;
};

function Radio(props) {
  return (
    <div>
      <h4>{props.question.title}</h4>
      <ul>
        {
          props.question.options.map((option) => (<li key={option.id}>
            {option.value} - {countAnswers(props.question.answers, option.id)}
          </li>))
        }
      </ul>
      <Doughnut data={getChartData(props.question, countAnswers, 'green')} />
    </div>
  );
}

export default Radio;
