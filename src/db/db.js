let db = {
  executeTransaction(query) {
    db = openDatabase('quizzes', '0.1', 'Course project iTechArt', 2 * 1024 * 1024);
    return new Promise((resolve, reject) => {
      db.transaction((transaction) => {
        transaction.executeSql(query, [],
          (transaction, result) => {
            resolve([...result.rows]);
          }, (tx, error) => {
            reject(error);
          })
      })
    })
  },
  init() {
    this.executeTransaction(`CREATE TABLE IF NOT EXISTS
    'users'(
      'id' INTEGER PRIMARY KEY ASC,
      'login' VARCHAR(10) NOT NULL,
      'email' VARCHAR(50) NOT NULL,
      'password' VARCHAR(16) NOT NULL,
      'isAdmin' BOOLEAN DEFAULT FALSE,
      'date' DATETIME NOT NULL
    )`)
    this.executeTransaction(`CREATE TABLE IF NOT EXISTS
    'quizzes'(
      'id' INTEGER PRIMARY KEY ASC,
      'title' VARCHAR(50) NOT NULL,
      'isAnon' BOOLEAN DEFAULT FALSE,
      'isRand' BOOLEAN DEFAULT FALSE,
      'date' DATETIME NOT NULL,
      'author_id' INTEGER NOT NULL
    )`)
  }
}
export default db