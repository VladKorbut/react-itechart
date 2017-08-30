import {
  LOGIN,
  LOGOUT,
} from '../types/actions/login';
import storage from '../localStorage/storage';

const isLoggedIn = { isLoggedIn: !!storage.getUser().login, ...storage.getUser() };

const loginReducer = (loggedIn = isLoggedIn, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        isLoggedIn: true,
        ...action.user,
      };
    case LOGOUT:
      return {
        isLoggedIn: false,
      };
    default:
      return { isLoggedIn: loggedIn };
  }
};

export default loginReducer;
