import { CHECKBOX, RADIO, STARS, TEXT } from '../types/questions';
import { itemExist, indexOfById } from './processQuiz';
import cv from './converter';
import dc from './dateConverter';

function processAnswer(answer, type) {
  switch (type) {
    case CHECKBOX: return answer ? answer.split(',').map(item => +item) : [];
    case RADIO: return +answer;
    case STARS: return +answer;
    case TEXT: return answer || '';
    default: return answer || '';
  }
}

const processResult = (quiz) => {
  quiz = [...quiz.rows];

  const res = {};
  res.id = quiz[0].id;
  res.title = quiz[0].title;
  res.isAnon = cv.strToBool(quiz[0].isAnon);
  res.isRand = cv.strToBool(quiz[0].isRand);
  res.date = dc.getDDMMYYYY(quiz[0].date);

  const questions = [];

  quiz.forEach((item) => {
    if (!itemExist(questions, item.question_id)) {
      const question = {};
      question.title = item.question_title;
      question.type = item.type;
      question.isRequired = cv.strToBool(item.isRequired);
      question.id = item.question_id;
      question.options = item.type < STARS ? [] : null;
      question.answer = processAnswer(item.answer, item.type);
      questions.push(question);
    }
  });

  quiz.forEach((item) => {
    if (item.type < STARS) {
      questions[indexOfById(questions, item.question_id)].options.push({
        id: item.option_id, value: item.text,
      });
    }
  });

  res.questions = questions;

  return res;
};

export default processResult;
export { processAnswer };
