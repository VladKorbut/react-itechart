import db from './db'
import processResult from '../common/processResult'

const result = {
  getResult(quizId, userId){
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
      .then(result=>{
        return processResult(result)
      })
  },
  get(quizId, userId) {
    return db.executeTransaction(`SELECT
    a.id, a.value, a.question_id, quest.type
    FROM answers a
    JOIN quiz_result q ON a.quiz_result_id=q.id
    JOIN questions as quest on a.question_id = quest.id
    WHERE quiz_result_id=${quizId} AND q.user_id=${userId}`)
    .then(result=>{
      return processResult(result)
    });
  }
}

export default result