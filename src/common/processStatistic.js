import { processAnswer } from './processResult';

function getQuestionAnswers(answers, questionId) {
  return answers.filter(answer => answer.question_id === questionId);
}

function processAnswers(answers, questionType) {
  return answers.map(answer => ({
    id: answer.id,
    value: processAnswer(answer.value, questionType),
  }));
}

const processStat = (quiz, answers, answersCount) => {
  answers = [...answers.rows];
  quiz.answersCount = answersCount.rows[0].answers;
  const questions = quiz.questions;

  questions.forEach((question) => {
    const questionAnswers = getQuestionAnswers(answers, question.id);
    question.answers = processAnswers(questionAnswers, question.type);
  });

  return quiz;
};

export default processStat;
