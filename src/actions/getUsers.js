import {
  USERS_LOADING,
  USERS_SUCCESS,
  USERS_ERROR,
} from '../types/actions/users';

import users from '../db/users';

export const getUsers = () => (dispatch) => {
  dispatch({ type: USERS_LOADING });
  users.get()
    .then((users) => {
      dispatch({
        type: USERS_SUCCESS,
        users,
      });
    })
    .catch(() => {
      dispatch({
        type: USERS_ERROR,
      });
    });
};
