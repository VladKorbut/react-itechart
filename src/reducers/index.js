import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import usersReducer from './usersReducer';
import quizzesReducer from './quizzesReducer';
import quizReducer from './quizReducer';
import resultsReducer from './resultsReducer';

const reducers = combineReducers({
  loginReducer,
  usersReducer,
  quizzesReducer,
  quizReducer,
  resultsReducer,
});

export default reducers;

