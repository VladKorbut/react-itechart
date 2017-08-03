import db from './db'
import cv from '../common/converter'
import ls from '../localStorage/storage'

let quiz = {
  create(quiz) {
    return this.createQuiz(quiz);
  },
  createQuiz(quiz) {
    return db.executeTransaction(`INSERT INTO
    quizzes(title, isAnon, isRand, date, author_id)
    VALUES('${quiz.title}', '${cv.boolToStr(quiz.isAnon)}', '${cv.boolToStr(quiz.isRand)}', ${Date.now()}, ${+ls.getUser()})`)
      .then((data) => {
        this.createQuestion(quiz.questions, data.insertId);
      });
  },
  createQuestion(questions, quizId) {
    questions.forEach((item) => {
      db.executeTransaction(`INSERT INTO
      questions(title, isRequired, type, quiz_id)
      VALUES ('${item.title}', '${cv.boolToStr(item.isRequired)}', ${item.type}, ${+quizId})`)
        .then((data) => {
          this.createOption(item.options, data.insertId);
        })
    });
  },
  createOption(options, questionId) {
    let insert = options.map((item) => {
      return `('${item}', ${questionId})`
    });
    return db.executeTransaction(`INSERT INTO
    question_options(text, question_id)
    VALUES ${insert.join(', ')}`);
  }
}

export default quiz