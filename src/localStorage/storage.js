import cv from '../common/converter';

export default {
  pushUser(user) {
    localStorage.setItem('id', user.id);
    localStorage.setItem('login', user.login);
    localStorage.setItem('isAdmin', user.isAdmin);
  },
  getUser() {
    return {
      id: +localStorage.getItem('id'),
      login: localStorage.getItem('login'),
      isAdmin: localStorage.getItem('isAdmin') ? cv.strToBool(localStorage.getItem('isAdmin')) : null,
    };
  },
  removeUser() {
    localStorage.removeItem('id');
    localStorage.removeItem('login');
    localStorage.removeItem('isAdmin');
  },
};
