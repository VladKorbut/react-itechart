import { CHECKBOX, RADIO, STARS, TEXT } from '../types/questions'
import { itemExist, indexOfById } from './processQuiz'
import cv from './converter'
import dc from './dateConverter'

const processResult = (quiz) => {
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
      question.answer = processAnswer(item.answer, item.type);
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

const processStat = (quiz) => {
  quiz = [...quiz.rows];

  let res = {};
  res.id = quiz[0].id;
  res.title = quiz[0].title;
  res.isAnon = cv.strToBool(quiz[0].isAnon);
  res.isRand = cv.strToBool(quiz[0].isRand);
  res.date = dc.getDDMMYYYY(quiz[0].date);

  let questions = [];

  quiz.forEach(item => {
    if (!itemExist(questions, item.question_id)) {
      let question = {};
      question.title = item.question_title;
      question.type = item.type;
      question.isRequired = cv.strToBool(item.isRequired);
      question.id = item.question_id;
      question.options = item.type < STARS ? [] : null;
      question.answers = [];
      questions.push(question);
    } else {
      return
    }
  })

  quiz.forEach(item=>{
    let question = questions[indexOfById(questions, item.question_id)];
    if(!(indexOfById(question.answers, item.answer_id)+1)){
      questions[indexOfById(questions, item.question_id)].answers.push({
        id: item.answer_id,
        value: processAnswer(item.answer, item.type)
      })
    }
  })

  quiz.forEach(item => {
    if (item.type < STARS && !itemExist(questions[indexOfById(questions, item.question_id)].options, item.option_id)) {
      questions[indexOfById(questions, item.question_id)].options.push({
        id: item.option_id, value: item.text
      });
    }
  })

  res.questions = questions

  return res;
}


function processAnswer(answer, type) {
  switch (type) {
    case CHECKBOX: return answer.split(',').map(item => +item);
    case RADIO: return +answer;
    case STARS: return +answer;
    case TEXT: return answer;
    default: return answer;
  }
}

export default processResult
export { processStat }