import db from './db'
let login = (login, password) => {
  return db.executeTransaction(`SELECT * FROM users WHERE login='${login}' AND password='${password}'`);
}
export default login