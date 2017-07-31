import {
  LOGIN,
  LOGOUT
} from '../types/login'

export const login = () => dispatch => {
  dispatch({
    type: LOGIN
  })
}

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  })
}
