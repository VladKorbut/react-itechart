export default {
  pushUser(userId) {
    return localStorage.setItem('user', userId);
  },
  getUser() {
    return localStorage.getItem('user');
  },
  removeUser() {
    return localStorage.removeItem('user');
  }
}