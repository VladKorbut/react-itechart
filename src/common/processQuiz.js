import cv from './converter'
import dc from './dateConverter'
import { STARS } from '../types/questions'

const processQuiz = (quiz) => {
  quiz = [...quiz.rows];

  let res = {};
  res.id = quiz[0].id;
  res.title = quiz[0].title;
  res.isAnon = cv.strToBool(quiz[0].isAnon);
  res.isRand = cv.strToBool(quiz[0].isRand);
  res.date = dc.getDDMMYYYY(quiz[0].date);

  let questions = [];

  quiz.forEach((item) => {
    if (!itemExist(questions, item.question_id)) {
      let question = {};
      question.title = item.question_title;
      question.type = item.type;
      question.isRequired = cv.strToBool(item.isRequired);
      question.id = item.question_id;
      question.options = item.type < STARS ? [] : null;
      questions.push(question);
    } else {
      return
    }
  })

  quiz.forEach((item) => {
    if (item.type < STARS) {
      questions[indexOfById(questions, item.question_id)].options.push({
        id: item.option_id, value: item.text
      });
    }
  })

  res.questions = questions

  return res;
}

const itemExist = (arr, id) => {
  let result = false;
  arr.forEach((item) => {
    if (item.id === id) {
      result = true;
    }
  })
  return result;
}

const indexOfById = (arr, id) => {
  let index = -1;
  arr.forEach((item, i) => {
    if (item.id === id) {
      index = i;
    }
  })
  return index;
}

export default processQuiz
export {
  itemExist,
  indexOfById
}