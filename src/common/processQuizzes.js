import cv from './converter'

const processQuizzes = (quizzes) => {
  return quizzes.map((quiz) => ({
    id: quiz.id,
    complete: quiz.complete,
    title: quiz.title,
    author_id: quiz.author_id,
    date: quiz.date,
    isAnon: cv.strToBool(quiz.isAnon),
    isRand: cv.strToBool(quiz.isRand),
  }))
}

export default processQuizzes;