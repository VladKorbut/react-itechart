import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import getChartData, { horisontalPercentage } from '../../../common/graphs';

const countAnswers = (answers, optionId) => answers.reduce(
  (sum, item) => (item.value === optionId ? sum + 1 : sum),
  0,
);

const starsOptions = (() => ([1, 2, 3, 4, 5]).map(item => ({
  id: item,
  value: item,
})))();

function Stars(props) {
  return (
    <div>
      <h4>{props.question.title}</h4>
      {
        props.question.answers.length !== props.passed ?
          <p>Skipped: {props.question.answers.length - props.passed}</p>
          : null
      }
      <HorizontalBar
        data={getChartData(
          { ...props.question, options: starsOptions },
          countAnswers,
          'purple',
        )}
        options={horisontalPercentage}
      />
    </div>
  );
}

export default Stars;
