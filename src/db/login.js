import db from './db';

const login = (username, password) => db.executeTransaction(`SELECT * FROM users WHERE login='${username}' AND password='${password}'`);
export default login;
