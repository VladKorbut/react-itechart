import db from './db'
export default {
  get() {
    return db.executeTransaction(`SELECT * FROM users`);
  },
  getLogins() {
    return db.executeTransaction(`SELECT login FROM users`);
  },
  getUserByLogin(login) {
    return db.executeTransaction(`SELECT * FROM users WHERE login='${login}'`);
  },
  getUserByEmail(email) {
    return db.executeTransaction(`SELECT * FROM users WHERE email='${email}'`);
  }
}