import db from './db'
import cv from '../common/converter'
let registerUser = (login, email, password, isAdmin = false) => {
  return db.executeTransaction(`INSERT INTO
  users(login, email, password, isAdmin, date)
  values('${login}', '${email}', '${password}', '${cv.boolToStr(isAdmin)}','${Date.now()}')`)
}

export default registerUser