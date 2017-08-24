import db from './db';
import processResult from '../common/processResult';
import processStat from '../common/processStatistic';
import quiz from './quiz';
import answers from './answers';

const result = {
  getResult(quizResultId) {
    return db.executeTransaction(`SELECT
    quiz.id, quiz.title, quiz.isRand, quiz.isAnon, quiz.date,
    quest.title as question_title, quest.type, quest.isRequired, quest.id as question_id,
    opt.text, opt.id as option_id,
    ans.value as answer
    from quizzes quiz
      LEFT JOIN quiz_result
      ON quiz_result.quiz_id = quiz.id
      LEFT JOIN questions quest
      ON quiz.id = quest.quiz_id
      LEFT JOIN question_options opt
      ON opt.question_id = quest.id
      LEFT JOIN answers ans
      ON ans.question_id = quest.id AND ans.quiz_result_id = quiz_result.id
      WHERE quiz_result.id = ${quizResultId}`)
      .then(result => processResult(result));
  },
  getStat(quizId) {
    return Promise.all([
      quiz.getSingle(quizId),
      answers.getQuizAnswers(quizId),
      answers.getQuizAnswersCount(quizId),
    ]).then(values => processStat(...values));
  },
};

export default result;
