import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import usersReducer from './usersReducer';
import quizzesReducer from './quizzesReducer';
import quizReducer from './quizReducer';
import resultsReducer from './resultsReducer';
import { routerReducer } from 'react-router-redux';

const reducers = combineReducers({
  loginReducer,
  usersReducer,
  quizzesReducer,
  quizReducer,
  resultsReducer,
  routing: routerReducer,
});

export default reducers;

