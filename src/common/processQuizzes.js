import cv from './converter'
import dc from './dateConverter'

const processQuizzes = (quizzes) => {
  return quizzes.map((quiz) => ({
    id: quiz.id,
    title: quiz.title,
    author_id: quiz.author_id,
    date: dc.getDDMMYYYY(quiz.date),
    isAnon: cv.strToBool(quiz.isAnon),
    isRand: cv.strToBool(quiz.isRand),
  }))
}

export default processQuizzes;