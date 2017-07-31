import {
  LOGIN,
  LOGOUT
} from '../types/login'
import storage from '../localStorage/storage'

let isLoggedIn = !!storage.getUser();

const loginReducer = (loggedIn = isLoggedIn, action) => {
  switch (action.type) {
    case LOGIN:
      return true;
    case LOGOUT:
      return false;
    default:
      return loggedIn;
  }
}

export default loginReducer
