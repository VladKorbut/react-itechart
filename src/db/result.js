import db from './db'
import processResult, { processStat } from '../common/processResult'

const result = {
  getResult(quizId, userId) {
    return db.executeTransaction(`SELECT
    quiz.id, quiz.title, quiz.isRand, quiz.isAnon, quiz.date,
    quest.title as question_title, quest.type, quest.isRequired, quest.id as question_id,
    opt.text, opt.id as option_id,
    ans.value as answer
    from quizzes quiz
      LEFT join questions quest
      On quiz.id = quest.quiz_id
      LEFT JOIN question_options opt
      ON opt.question_id = quest.id
      LEFT JOIN answers ans
      ON ans.question_id = quest.id
      JOIN quiz_result
      ON quiz_result.id = ans.quiz_result_id
      WHERE quiz.id = ${quizId}
      AND
      quiz_result.user_id = ${userId}`)
      .then(result => {
        return processResult(result)
      })
  },
  getStat(quizId) {
    return db.executeTransaction(`SELECT
    quiz.id, quiz.title, quiz.isRand, quiz.isAnon, quiz.date,
    quest.title as question_title, quest.type, quest.isRequired, quest.id as question_id,
    opt.text, opt.id as option_id,
    ans.value as answer,
    ans.id as answer_id
    from quizzes quiz
      LEFT join questions quest
      On quiz.id = quest.quiz_id
      LEFT JOIN question_options opt
      ON opt.question_id = quest.id
      LEFT JOIN answers ans
      ON ans.question_id = quest.id
      JOIN quiz_result
      ON quiz_result.id = ans.quiz_result_id
      WHERE quiz.id = ${quizId}`)
      .then(result => {
        return processStat(result)
      })
  }
}

export default result