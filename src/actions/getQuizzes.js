import {
  QUIZZES_LOADING,
  QUIZZES_SUCCESS,
  QUIZZES_ERROR
} from '../types/quiz'

import quiz from '../db/quiz'

export const getMyQuizzes = () => dispatch => {
  dispatch({ type: QUIZZES_LOADING });
  quiz.getMy()
    .then((quizzes) => {
      console.log(quizzes);
      dispatch({
        type: QUIZZES_SUCCESS,
        quizzes: [...quizzes.rows],
      })
    })
    .catch((error) => {
      dispatch({
        type: QUIZZES_ERROR,
      })
    })
}