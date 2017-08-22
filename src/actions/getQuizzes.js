import {
  QUIZZES_LOADING,
  QUIZZES_SUCCESS,
  QUIZZES_ERROR,
} from '../types/actions/quizzes';

import quiz from '../db/quiz';

export const getQuizzes = () => (dispatch) => {
  dispatch({ type: QUIZZES_LOADING });

  quiz.getMy()
    .then((quizzes) => {
      dispatch({
        type: QUIZZES_SUCCESS,
        quizzes,
      });
    })
    .catch(() => {
      dispatch({
        type: QUIZZES_ERROR,
      });
    });
};
