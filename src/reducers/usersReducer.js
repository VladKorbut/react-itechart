import {
  USERS_LOADING,
  USERS_SUCCESS,
  USERS_ERROR
} from '../types/users'

let usersInitState = {
  loading: false,
  success: false,
  users: [],
}

const usersReducer = (usersState = usersInitState, action) => {
  switch (action.type) {
    case USERS_LOADING: return {
      loading: true,
      success: false
    };
    case USERS_SUCCESS: return {
      loading: false,
      success: true,
      users: action.users,
    };
    case USERS_ERROR: return {
      loading: false,
      success: false,
      users: [],
    };
    default: return usersState;
  }
}

export default usersReducer;