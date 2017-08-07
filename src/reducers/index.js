import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import usersReducer from './usersReducer'
import quizReducer from './quizReducer'

const reducers = combineReducers({
  loginReducer: loginReducer,
  usersReducer: usersReducer,
  quizReducer: quizReducer,
})

export default reducers
