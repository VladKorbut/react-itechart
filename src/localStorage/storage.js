export default {
  pushUser(userId, login) {
    localStorage.setItem('id', userId);
    localStorage.setItem('login', login);
  },
  getUser() {
    return {
      id: localStorage.getItem('id'),
      login: localStorage.getItem('login'),
    }
  },
  removeUser() {
    localStorage.removeItem('id');
    localStorage.removeItem('login');
  }
}