import {
  QUIZZES_LOADING,
  QUIZZES_SUCCESS,
  QUIZZES_ERROR
} from '../types/actions/quizzes'

import quiz from '../db/quiz'

export const getMyQuizzes = () => dispatch => {
  dispatch({ type: QUIZZES_LOADING });
  quiz.getMy()
    .then((quizzes) => {
      dispatch({
        type: QUIZZES_SUCCESS,
        quizzes: quizzes,
      })
    })
    .catch((error) => {
      dispatch({
        type: QUIZZES_ERROR,
      })
    })
}