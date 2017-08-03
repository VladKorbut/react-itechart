let db = {
  executeTransaction(query) {
    db = openDatabase('quizzes', '0.1', 'Course project iTechArt', 2 * 1024 * 1024);
    return new Promise((resolve, reject) => {
      db.transaction((transaction) => {
        transaction.executeSql(query, [],
          (tx, result) => {
            resolve(result);
          }, (tx, error) => {
            reject(error);
          })
      })
    })
  },
  createUsersTable() {
    this.executeTransaction(`CREATE TABLE IF NOT EXISTS
    'users'(
      'id' INTEGER PRIMARY KEY ASC,
      'login' VARCHAR(10) NOT NULL,
      'email' VARCHAR(50) NOT NULL,
      'password' VARCHAR(16) NOT NULL,
      'isAdmin' BOOLEAN DEFAULT FALSE,
      'date' DATETIME NOT NULL
    )`)
  },
  createQuizzesTable() {
    this.executeTransaction(`CREATE TABLE IF NOT EXISTS
    'quizzes'(
      'id' INTEGER PRIMARY KEY ASC,
      'title' VARCHAR(50) NOT NULL,
      'isAnon' BOOLEAN DEFAULT FALSE,
      'isRand' BOOLEAN DEFAULT FALSE,
      'date' DATETIME NOT NULL,
      'author_id' INTEGER NOT NULL
    )`)
  },
  createQuestionsTable() {
    this.executeTransaction(`CREATE TABLE IF NOT EXISTS
    'questions'(
      'id' INTEGER PRIMARY KEY ASC,
      'title' VARCHAR(50) NOT NULL,
      'type' INTEGER NOT NULL,
      'isRequired' BOOLEAN DEFAULT FALSE,
      'quiz_id' INTEGER NOT NULL
    )`)
  },
  createOptionsTable() {
    this.executeTransaction(`CREATE TABLE IF NOT EXISTS
    'question_options'(
      'id' INTEGER PRIMARY KEY ASC,
      'text' VARCHAR(50) NOT NULL,
      'question_id' INTEGER NOT NULL
    )`)
  },
  init() {
    this.createUsersTable();
    this.createQuizzesTable();
    this.createQuestionsTable();
    this.createOptionsTable();
  }
}
export default db