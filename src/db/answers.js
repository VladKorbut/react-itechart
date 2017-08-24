import db from './db';
import store from '../store';

const answers = {
  createAnswers(answers, quizId) {
    return db.executeTransaction(`INSERT INTO quiz_result(date, user_id, quiz_id)
VALUES(${Date.now()}, ${store.getState().loginReducer.id}, ${quizId})`)
      .then((res) => {
        const insert = answers.map(item => (
          `('${item.answer}', ${item.id}, ${res.insertId})`
        ));
        if (insert.length) {
          return db.executeTransaction(`INSERT INTO answers(value, question_id, quiz_result_id)
VALUES ${insert.join(', ')}`);
        }
        return res;
      })
      .catch((error) => {
        throw new Error(error);
      });
  },
  getQuizAnswers(quizId) {
    return db.executeTransaction(`SELECT
    qr.id as quiz_result_id, a.*
    FROM quiz_result qr
    LEFT JOIN answers a
    ON a.quiz_result_id = qr.id
    WHERE qr.quiz_id = ${quizId}`);
  },
  getQuizAnswersCount(quizId) {
    return db.executeTransaction(`SELECT
    COUNT(*) as answers FROM quiz_result
    WHERE quiz_result.quiz_id = ${quizId}`);
  },
};

export default answers;
