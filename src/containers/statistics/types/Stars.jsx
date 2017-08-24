import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import getChartData, { horisontalPercentage } from '../../../common/graphs';

const countAnswers = (answers, value) => {
  let count = 0;
  answers.forEach((item) => {
    if (item.value === value) {
      ++count;
    }
  });
  return count;
};

const starsOptions = (() => ([1, 2, 3, 4, 5]).map((item, index) => ({
  id: index + 1,
  value: index + 1,
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
