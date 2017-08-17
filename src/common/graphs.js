import randColor from 'randomcolor'
import { CHECKBOX, STARS } from '../types/questions'

const getAnswersLength = (answers, type) => {
  if (type === CHECKBOX) {
    let length = 0;
    answers.forEach(answer => {
      length += answer.value.length;
    })
    return length;
  }
  return answers.length;
}

const getNumberOfColours = (question) => {
  if(question.type === STARS) {
    return 5;
  }
  return getAnswersLength(question.answers, question.type);
}

function getChartData(question, countAnswers, hue) {
  return {
    labels: question.options.map(option => option.value + ` (${countAnswers(question.answers, option.id)})`),
    datasets: [{
      label: question.title || 'results',
      data: question.options.map(option => {
        let percents = countAnswers(question.answers, option.id) * 100 / getAnswersLength(question.answers, question.type);
        return percents.toPrecision(3)
      }),
      backgroundColor: randColor({ count: getNumberOfColours(question), hue: hue || '', luminosity: 'bright'}),
      borderWidth: 1,
    }]
  }
}

const percentageOptions = {
  scales: {
    xAxes: [{
      ticks: {
        min: 0,
        max: 100,
        callback: function (value) { return value + "%" }
      },
      scaleLabel: {
        display: true,
        labelString: "Percentage"
      }
    }]
  }
}

export default getChartData
export {
  percentageOptions
}