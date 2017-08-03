import React, { Component } from 'react'
import QuizzesTable from '../components/QuizzesTable'
import quiz from '../db/quiz'

class MyQuizzes extends Component {
  componentWillMount(){
    quiz.getMy().then((quizzes)=>{
      this.setState({quizzes: [...quizzes.rows]})
    })
  }
  constructor(){
    super();
    this.state ={
      quizzes: [],
    }
  }
  render () {
    return (
      <div>
        <QuizzesTable data={this.state.quizzes}/>
      </div>
    )
  }
}

export default MyQuizzes