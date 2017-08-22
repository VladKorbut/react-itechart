import {
  RESULTS_LOADING,
  RESULTS_SUCCESS,
  RESULTS_ERROR,
} from '../types/actions/results';

let resultsInitState = {
  loading: false,
  success: false,
  results: [],
};

const quizzesReducer = (resultsState = resultsInitState, action) => {
  switch (action.type) {
    case RESULTS_LOADING: return {
      loading: true,
      success: false,
    };
    case RESULTS_SUCCESS: return {
      loading: false,
      success: true,
      results: action.results,
    };
    case RESULTS_ERROR: return {
      loading: false,
      success: false,
      results: [],
    };
    default: return resultsState;
  }
};

export default quizzesReducer;
