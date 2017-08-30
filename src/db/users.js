import db from './db';
import processUsers from '../common/processUsers';
import cv from '../common/converter';

export default {
  get() {
    return db.executeTransaction('SELECT * FROM users')
      .then(users => processUsers(users.rows));
  },
  getById(id) {
    return db.executeTransaction(`SELECT * FROM users WHERE id=${id}`)
      .then(users => processUsers(users.rows));
  },
  getLogins() {
    return db.executeTransaction('SELECT login FROM users');
  },
  getUserByLogin(login) {
    return db.executeTransaction(`SELECT * FROM users WHERE login='${login}'`);
  },
  getUserByEmail(email) {
    return db.executeTransaction(`SELECT * FROM users WHERE email='${email}'`);
  },
  deleteUser(id) {
    return db.executeTransaction(`DELETE FROM users WHERE id='${id}'`);
  },
  changeRole(id, isAdmin) {
    return db.executeTransaction(`UPDATE users SET isAdmin = '${cv.boolToStr(isAdmin)}' WHERE id=${id}`);
  },
};
