import {
  RESULTS_LOADING,
  RESULTS_SUCCESS,
  RESULTS_ERROR,
} from '../types/actions/results';

import results from '../db/results';

export const getResults = (quizId) => (dispatch) => {
  dispatch({ type: RESULTS_LOADING });
  results.get(quizId)
    .then((res) => {
      dispatch({
        type: RESULTS_SUCCESS,
        results: [...res.rows],
      });
    })
    .catch(() => {
      dispatch({
        type: RESULTS_ERROR,
      });
    });
};
