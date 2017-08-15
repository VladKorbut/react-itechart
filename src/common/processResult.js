import {CHECKBOX, RADIO, STARS, TEXT} from '../types/questions'

const processResult = result => {
  result = [...result.rows]
  return result.map((item) => {
    return {
      id: item.id,
      question_id: item.question_id,
      value: processAnswer(item.value, item.type)
    }
  })
}

function processAnswer(answer, type) {
  switch(type){
    case CHECKBOX : return answer.split(',').map(item=>+item);
    case RADIO : return +answer;
    case STARS : return +answer;
    case TEXT: return answer;
    default: return answer;
  }
}

export default processResult