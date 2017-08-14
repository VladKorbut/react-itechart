import React, { Component } from 'react'
import Questions from './questions/Questions'
import quiz from '../db/quiz'
import result from '../db/result'

const indexOfAnswer = (answers, questionId) => {
  let index = -1;
  answers.forEach((item, i)=>{
    if(item.question_id === questionId){
      index = i;
    }
  });
  return index;
}

class Result extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      questions: [],
      answers: [],
    }
  }
  componentWillMount() {
    Promise.all([
      quiz.getSingle(this.props.params.quizId),
      result.get(this.props.params.quizId, this.props.params.userId)
    ]).then(values=>{

      let answers = values[1];
      let questions = values[0].questions;
      questions = questions.map(item=>{
        return{
          ...item,
          answer: answers[indexOfAnswer(answers, item.id)]
        }
      })
      console.log(questions);
      this.setState({
        questions: questions,
        answers: answers,
      })
    })

  }
  render() {
    return (
      <div>
        <Questions questions={this.state.questions} answers={this.state.answers}/>
      </div>
    )
  }
}

export default Result