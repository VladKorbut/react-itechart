import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import getChartData from '../../../common/graphs';

const countAnswers = (answers, optionId) => answers.reduce(
  (sum, item) => (item.value === optionId ? sum + 1 : sum),
  0,
);

function Radio(props) {
  return (
    <div>
      <h4>{props.question.title}</h4>
      {
        props.question.answers.length !== props.passed ?
          <p>Skipped: {props.question.answers.length - props.passed}</p>
          : null
      }
      <Doughnut data={getChartData(props.question, countAnswers, 'green')} />
    </div>
  );
}

export default Radio;
