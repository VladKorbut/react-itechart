import randColor from 'randomcolor';
import { CHECKBOX, STARS } from '../types/questions';

const getAnswersLength = (answers, type) => {
  if (type === CHECKBOX) {
    return answers.reduce((res, answer) => res + answer.value.length, 0);
  }
  return answers.length;
};

const getNumberOfColours = (question) => {
  if (question.type === STARS) {
    return 5;
  }
  return question.options.length;
};

function getChartData(question, countAnswers = 0, hue = '') {
  return {
    labels: question.options.map(option => `${option.value} (${countAnswers(question.answers, option.id)})`),
    datasets: [{
      label: question.title || 'results',
      data: question.options.map((option) => {
        const percents = (countAnswers(question.answers, option.id) * 100)
          / getAnswersLength(question.answers, question.type);
        return percents.toPrecision(3);
      }),
      backgroundColor: randColor({ count: getNumberOfColours(question), hue, luminosity: 'bright' }),
      borderWidth: 1,
    }],
  };
}

const horisontalPercentage = {
  scales: {
    xAxes: [{
      ticks: {
        min: 0,
        max: 100,
        callback: value => `${value} %`,
      },
      scaleLabel: {
        display: true,
        labelString: 'Percentage',
      },
    }],
  },
};

const percentage = {
  scales: {
    yAxes: [{
      ticks: {
        min: 0,
        max: 100,
        callback: value => `${value} %`,
      },
      scaleLabel: {
        display: true,
        labelString: 'Percentage',
      },
    }],
  },
};

export default getChartData;
export {
  percentage,
  horisontalPercentage,
};
