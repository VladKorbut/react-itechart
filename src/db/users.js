import db from './db'
import processUsers from '../common/processUsers'

export default {
  get() {
    return db.executeTransaction(`SELECT * FROM users`)
      .then((users) => {
        return processUsers(users.rows)
      })
  },
  getById(id) {
    return db.executeTransaction(`SELECT * FROM users WHERE id=${id}`)
      .then((users) => {
        return processUsers(users.rows)
      })
  },
  getLogins() {
    return db.executeTransaction(`SELECT login FROM users`);
  },
  getUserByLogin(login) {
    return db.executeTransaction(`SELECT * FROM users WHERE login='${login}'`);
  },
  getUserByEmail(email) {
    return db.executeTransaction(`SELECT * FROM users WHERE email='${email}'`);
  },
  deleteUser(id) {
    return db.executeTransaction(`DELETE FROM users WHERE id='${id}'`);
  }
}