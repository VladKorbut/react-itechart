import db from './db';

const results = {
  get(quizId) {
    return db.executeTransaction(`SELECT q.id, q.date, u.login
    FROM quiz_result as q
    JOIN users as u ON q.user_id=u.id
    WHERE quiz_id=${quizId}`);
  },
};

export default results;
