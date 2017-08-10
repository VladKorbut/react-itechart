import db from './db'

const createAnswers = (answers) => {
  console.log(answers);
  let insert = answers.map((item)=>(
    `('${item.answer}', ${item.id})`
  ))
  return db.executeTransaction(`INSERT INTO answers(value, question_id) VALUES ${insert.join(', ')}`)
}

export default createAnswers;