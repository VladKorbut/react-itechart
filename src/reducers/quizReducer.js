import {
  QUIZZES_LOADING,
  QUIZZES_SUCCESS,
  QUIZZES_ERROR
} from '../types/quiz'

let quizInitState = {
  loading: false,
  success: false,
  quizzes: [],
}

const quizReducer = (quizState = quizInitState, action) => {
  switch (action.type) {
    case QUIZZES_LOADING: return {
      loading: true,
      success: false
    };
    case QUIZZES_SUCCESS: return {
      loading: false,
      success: true,
      quizzes: action.quizzes,
    };
    case QUIZZES_ERROR: return {
      loading: false,
      success: false,
      quizzes: [],
    };
    default: return quizInitState;
  }
}

export default quizReducer;