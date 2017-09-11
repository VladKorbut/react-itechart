import { browserHistory } from 'react-router';
import {
  QUIZ_LOADING,
  QUIZ_SUCCESS,
  QUIZ_ERROR,
} from '../types/actions/quiz';


import quizdb from '../db/quiz';

const getQuizSuccess = quiz => ({
  type: QUIZ_SUCCESS,
  quiz,
});

const getQuizError = () => ({
  type: QUIZ_ERROR,
});

export const getQuiz = id => (dispatch) => {
  dispatch({ type: QUIZ_LOADING });
  return quizdb.getSingle(id)
    .then((quiz) => {
      dispatch(getQuizSuccess(quiz));
      return quiz;
    })
    .catch((error) => {
      console.error(error);
      browserHistory.push('/404');
      dispatch(getQuizError());
      return false;
    });
};
