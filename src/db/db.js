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
      'id' INTEGER PRIMARY KEY AUTOINCREMENT,
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
      'id' INTEGER PRIMARY KEY AUTOINCREMENT,
      'title' VARCHAR(50) NOT NULL,
      'isAnon' BOOLEAN DEFAULT FALSE,
      'isRand' BOOLEAN DEFAULT FALSE,
      'date' DATETIME NOT NULL,
      'author_id' INTEGER NOT NULL,
      FOREIGN KEY (author_id) REFERENCES users (id)
    )`)
  },
  createQuestionsTable() {
    this.executeTransaction(`CREATE TABLE IF NOT EXISTS
    'questions'(
      'id' INTEGER PRIMARY KEY AUTOINCREMENT,
      'title' VARCHAR(50) NOT NULL,
      'type' INTEGER NOT NULL,
      'isRequired' BOOLEAN DEFAULT FALSE,
      'quiz_id' INTEGER NOT NULL,
      FOREIGN KEY (quiz_id) REFERENCES quizzes (id)
    )`)
  },
  createOptionsTable() {
    this.executeTransaction(`CREATE TABLE IF NOT EXISTS
    'question_options'(
      'id' INTEGER PRIMARY KEY AUTOINCREMENT,
      'text' VARCHAR(50) NOT NULL,
      'question_id' INTEGER NOT NULL,
      FOREIGN KEY (question_id) REFERENCES questions (id)
    )`)
  },
  createQuizResultTable() {
    this.executeTransaction(`CREATE TABLE IF NOT EXISTS
    'quiz_result'(
      'id' INTEGER PRIMARY KEY AUTOINCREMENT,
      'date' DATETIME NOT NULL,
      'user_id' INTEGER NOT NULL,
      'quiz_id' INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users (id),
      FOREIGN KEY (quiz_id) REFERENCES quizzes (id)
    )`)
  },
  createAnswersTable() {
    this.executeTransaction(`CREATE TABLE IF NOT EXISTS
    'answers'(
      'id' INTEGER PRIMARY KEY AUTOINCREMENT,
      'value' VARCHAR(50) NOT NULL,
      'question_id' INTEGER NOT NULL,
      'quiz_result_id' INTEGER NOT NULL,
      FOREIGN KEY (question_id) REFERENCES questions (id),
      FOREIGN KEY (quiz_result_id) REFERENCES quiz_result (id)
    )`)
  },
  init() {
    this.createUsersTable();
    this.createQuizzesTable();
    this.createQuestionsTable();
    this.createOptionsTable();
    this.createAnswersTable();
    this.createQuizResultTable();
  }
}
export default db