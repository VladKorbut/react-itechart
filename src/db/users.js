import db from './db'
export default {
  get() {
    return db.executeTransaction(`SELECT * FROM users`);
  },
  getLogins() {
    return db.executeTransaction(`SELECT login FROM users`);
  },
  loginIsAvailable(login) {
    return db.executeTransaction(`SELECT * FROM users WHERE login='${login}'`);
  },
  emailIsAvailable(email) {
    return db.executeTransaction(`SELECT * FROM users WHERE email='${email}'`);
  }
}