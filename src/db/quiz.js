import db from './db'
import cv from '../common/converter'
import processQuiz from '../common/processQuiz'
import processQuizzes from '../common/processQuizzes'
import ls from '../localStorage/storage'

let quiz = {
  create(quiz) {
    if (quiz.id) return this.updateQuiz(quiz);
    return db.executeTransaction(`INSERT INTO
    quizzes(title, isAnon, isRand, date, author_id)
    VALUES('${quiz.title}', '${cv.boolToStr(quiz.isAnon)}', '${cv.boolToStr(quiz.isRand)}', ${Date.now()}, ${ls.getUser().id})`)
      .then(data => {
        this.createQuestion(quiz.questions, data.insertId);
        return data;
      })
      .catch(error => {
        throw new Error(error);
      })
  },
  createQuestion(questions, quizId) {
    questions.forEach(item => {
      db.executeTransaction(`INSERT INTO
      questions(title, isRequired, type, quiz_id)
      VALUES ('${item.title}', '${cv.boolToStr(item.isRequired)}', ${item.type}, ${+quizId})`)
        .then(data => {
          if (item.options && item.options.length) {
            this.createOption(item.options, data.insertId);
          }
        })
        .catch(error => {
          throw new Error(error);
        })
    });
  },
  createOption(options, questionId) {
    let insert = options.map(item => (`('${item.value}', ${questionId})`));
    return db.executeTransaction(`INSERT INTO
    question_options(text, question_id)
    VALUES ${insert.join(', ')}`);
  },
  updateQuiz(quiz) {
    return db.executeTransaction(`UPDATE quizzes
    SET title='${quiz.title}', isAnon='${cv.boolToStr(quiz.isAnon)}',
    isRand='${cv.boolToStr(quiz.isRand)}', date=${Date.now()}, author_id=${ls.getUser().id}
    WHERE id=${quiz.id}`)
      .then(res => {
        this.deleteQuestions(quiz.questions, quiz.id)
          .then(() => {
            this.createQuestion(quiz.questions, quiz.id)
          });
      })
  },
  deleteQuestions(questions, quizId) {
    return db.executeTransaction(`DELETE FROM questions WHERE quiz_id=${quizId}`)
      .then(res => {
        questions.forEach(item => {
          this.deleteOption(item.options, item.id);
        })
      });
  },
  deleteOption(options, questionId) {
    options.forEach(option => {
      db.executeTransaction(`DELETE FROM question_options WHERE id=${option.id}`)
    })
  },
  getAll() {
    return db.executeTransaction(`SELECT
    quizzes.*, COUNT(quiz_result.id) as answers
    FROM quizzes
    LEFT JOIN quiz_result
    ON quizzes.id = quiz_result.quiz_id
    GROUP BY quizzes.id`)
      .then(res => {
        return processQuizzes([...res.rows]);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  getMy() {
    return db.executeTransaction(`SELECT
    quizzes.*, COUNT(quiz_result.id) as answers
    FROM quizzes
    LEFT JOIN quiz_result
    ON quizzes.id = quiz_result.quiz_id
    WHERE quizzes.author_id=${ls.getUser().id}
    GROUP BY quizzes.id`)
      .then(res => {
        return processQuizzes([...res.rows]);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  getSingle(id) {
    return db.executeTransaction(`SELECT
    quiz.id, quiz.title, quiz.isRand, quiz.isAnon, quiz.date,
    quest.title as question_title, quest.type, quest.isRequired, quest.id as question_id,
    opt.text, opt.id as option_id
    from quizzes quiz
      LEFT join questions quest
      On quiz.id = quest.quiz_id
      LEFT JOIN question_options opt
      ON opt.question_id = quest.id
      where quiz.id = ${id}`).then(data => {
        return processQuiz(data);
      })
  },
  getQuestions(id) {
    return db.executeTransaction(`SELECT * FROM questions WHERE quiz_id=${id}`);
  },
  getOptions(id) {
    return db.executeTransaction(`SELECT * FROM question_options WHERE question_id=${id}`);
  }
}

export default quiz