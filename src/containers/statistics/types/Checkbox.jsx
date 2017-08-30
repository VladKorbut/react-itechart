import React from 'react';
import { Bar } from 'react-chartjs-2';
import getChartData, { percentage } from '../../../common/graphs';

const countAnswers = (answers, optionId) => {
  let count = 0;
  answers.forEach((item) => {
    count += item.value.reduce((sum, value) => (value === optionId ? sum + 1 : sum), 0);
  });
  return count;
};

function Checkbox(props) {
  return (
    <div>
      <h4>{props.question.title}</h4>
      {
        props.question.answers.length !== props.passed ?
          <p>Skipped: {props.passed - props.question.answers.length}</p>
          : null
      }
      <Bar
        data={getChartData(props.question, countAnswers, 'blue')}
        options={percentage}
      />
    </div>
  );
}

export default Checkbox;
