import db from './db';
import cv from '../common/converter';

const registerUser = user => db.executeTransaction(`INSERT INTO
  users(login, email, password, isAdmin, date)
  values('${user.login}', '${user.email}', '${user.password}', '${cv.boolToStr(user.isAdmin)}','${Date.now()}')`);

export default registerUser;
