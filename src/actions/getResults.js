import {
  RESULTS_LOADING,
  RESULTS_SUCCESS,
  RESULTS_ERROR
} from '../types/results'

import results from '../db/results'

export const getResults = (quizId) => dispatch => {
  dispatch({ type: RESULTS_LOADING });
  results.get(quizId)
    .then((results) => {
      dispatch({
        type: RESULTS_SUCCESS,
        results: [...results.rows],
      })
    })
    .catch((error) => {
      dispatch({
        type: RESULTS_ERROR,
      })
    })
}