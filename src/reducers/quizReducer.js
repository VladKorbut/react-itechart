import {
  QUIZ_LOADING,
  QUIZ_SUCCESS,
  QUIZ_ERROR
} from '../types/quiz'

let quizInitState = {
  loading: false,
  success: null,
  quiz: {},
}

const quizReducer = (quizState = quizInitState, action) => {
  switch (action.type) {
    case QUIZ_LOADING: return {
      loading: true,
      success: false,
      quiz: {},
    };
    case QUIZ_SUCCESS: return {
      loading: false,
      success: true,
      quiz: action.quiz,
    };
    case QUIZ_ERROR: return {
      loading: false,
      success: false,
      quiz: {},
    };
    default: return quizInitState;
  }
}

export default quizReducer;