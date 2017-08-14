import db from './db'
import processResult from '../common/processResult'

let result = {
  get(quizId, userId) {
    return db.executeTransaction(`SELECT
    a.id, a.value, a.question_id, quest.type
    FROM answers as a
    JOIN quiz_result as q ON a.quiz_result_id=q.id
    JOIN questions as quest on a.question_id = quest.id
    WHERE quiz_result_id=${quizId} AND q.user_id=${userId}`)
    .then(result=>{
      return processResult(result)
    });
  }
}

export default result