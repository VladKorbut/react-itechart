import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import usersReducer from './usersReducer'
import quizzesReducer from './quizzesReducer'
import quizReducer from './quizReducer'

const reducers = combineReducers({
  loginReducer: loginReducer,
  usersReducer: usersReducer,
  quizzesReducer: quizzesReducer,
  quizReducer: quizReducer,
})

export default reducers
