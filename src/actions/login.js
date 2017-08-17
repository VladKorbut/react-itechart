import {
  LOGIN,
  LOGOUT
} from '../types/actions/login'
import storage from '../localStorage/storage'

export const login = (user) => dispatch => {
  storage.pushUser(user.id, user.login);
  dispatch({
    type: LOGIN,
    user: user,
  })
}

export const logout = () => dispatch => {
  storage.removeUser();
  dispatch({
    type: LOGOUT
  })
}
