import {
  QUIZ_LOADING,
  QUIZ_SUCCESS,
  QUIZ_ERROR
} from '../types/quiz'

import quizdb from '../db/quiz'

export const getQuiz = (id) => dispatch => {
  dispatch({ type: QUIZ_LOADING });
  return quizdb.getSingle(id)
    .then((quiz) => {
      dispatch({
        type: QUIZ_SUCCESS,
        quiz: quiz,
      });
      return quiz;
    })
    .catch((error) => {
      dispatch({
        type: QUIZ_ERROR,
      })
      return false;
    })
}