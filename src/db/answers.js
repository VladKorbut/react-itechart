import db from './db';
import store from '../store';


const createAnswers = (answers, quizId) => db.executeTransaction(`INSERT INTO quiz_result(date, user_id, quiz_id)
VALUES(${Date.now()}, ${store.getState().loginReducer.id}, ${quizId})`)
  .then((res) => {
    const insert = answers.map(item => (
      `('${item.answer}', ${item.id}, ${res.insertId})`
    ));
    return db.executeTransaction(`INSERT INTO answers(value, question_id, quiz_result_id)
VALUES ${insert.join(', ')}`);
  })
  .catch((error) => {
    throw new Error(error);
  });

export default createAnswers;
