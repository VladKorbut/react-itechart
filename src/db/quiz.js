import db from './db'
import cv from '../common/converter'
import processQuiz from '../common/processQuiz'
import ls from '../localStorage/storage'

let quiz = {
  create(quiz) {
    return this.createQuiz(quiz);
  },
  createQuiz(quiz) {
    return db.executeTransaction(`INSERT INTO
    quizzes(title, isAnon, isRand, date, author_id)
    VALUES('${quiz.title}', '${cv.boolToStr(quiz.isAnon)}', '${cv.boolToStr(quiz.isRand)}', ${Date.now()}, ${+ls.getUser().id})`)
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
          if (item.options && item.options.length) {
            this.createOption(item.options, data.insertId);
          }
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
  },
  getAll() {
    return db.executeTransaction(`SELECT * FROM quizzes`);
  },
  getMy() {
    return db.executeTransaction(`SELECT * FROM quizzes WHERE author_id=${ls.getUser().id}`);
  },
  getSingle(id) {
    return db.executeTransaction(`SELECT
    quiz.id, quiz.title, quiz.isRand, quiz.isAnon,
    quest.title as question_title, quest.type, quest.isRequired, quest.id as question_id,
    opt.text
    from quizzes quiz
      LEFT join questions quest
      On quiz.id = quest.quiz_id
      LEFT JOIN question_options opt
      ON opt.question_id = quest.id
      where quiz.id = ${id}`).then((data) => {
        return processQuiz(data);
      })
    /*let quiz = {};
    db.executeTransaction(`SELECT * FROM questions WHERE quiz_id=${id}`)
      .then((quizResult) => {
        quiz = quizResult.rows[0];
        this.getQuestions(quizResult.rows[0].id)
          .then((quest) => {
            quiz.questions = [...quest.rows];
            quiz.questions.forEach((item, index) => {
              this.getOptions(item.id)
                .then((options) => {
                  quiz.questions[index].options = [...options.rows];
                  console.log(quiz);
                })
            })
          })
      });
      */
  },
  getQuestions(id) {
    return db.executeTransaction(`SELECT * FROM questions WHERE quiz_id=${id}`);
  },
  getOptions(id) {
    return db.executeTransaction(`SELECT * FROM question_options WHERE question_id=${id}`);
  }
}

export default quiz