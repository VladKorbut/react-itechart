import db from './db'
import cv from '../common/converter'
import ls from '../localStorage/storage'

let quiz = {
  create(title, isAnon, isRand){
    return db.executeTransaction(`INSERT INTO
    quizzes(title, isAnon, isRand, date, author_id)
    VALUES('${title}', '${cv.boolToStr(isAnon)}', '${cv.boolToStr(isRand)}', ${Date.now()}, ${+ls.getUser()})`)
  }
}

export default quiz