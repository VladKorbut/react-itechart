import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { getQuiz } from '../actions/getQuiz'
import Spinner from '../components/Spinner'
import Question from './questions/Question'

class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      currentQuestion: {},
      prevQuestions: [],
      nextQuestions: [],
      answerIsValid: false,
      answers: [],
    }
  }
  componentWillMount() {
    this.props.get(this.props.params.id)
      .catch((error) => {
        browserHistory.push('/404');
      })
  }

  startQuiz = () => {
    this.setState({
      currentQuestion: this.props.quiz.questions.pop(),
      nextQuestions: this.props.quiz.questions
    });
  }

  nextQuestion = () => {
    this.setState({ answerIsValid: false });
    let prevQuestions = this.state.prevQuestions;
    prevQuestions.push(this.state.currentQuestion);
    let currentQuestion = this.state.nextQuestions.pop();
    this.setState({
      prevQuestions: prevQuestions,
      currentQuestion: currentQuestion,
    });
  }

  prevQuestion = () => {
    this.setState({ answerIsValid: false });
    let nextQuestions = this.state.nextQuestions;
    nextQuestions.push(this.state.currentQuestion);
    let currentQuestion = this.state.prevQuestions.pop();
    this.setState({
      nextQuestions: nextQuestions,
      currentQuestion: currentQuestion,
    });
  }

  finishQuiz = () => {
    console.log('finish')
  }

  getAnswers = (id, answer) => {
    let answers = this.state.answers;
    answers.push({id:id, answer: answer});
    this.setState({answers: answers});
    console.log(id, answer);
    if(answer !== 0 || answer.length){
      this.setState({answerIsValid: true})
    }
  }

  getAnswer = () => {
    let answer = [];
    const currentQuestionId = this.state.currentQuestion.id;
    this.state.answers.forEach((item, i)=>{
      if(item.id === currentQuestionId){
        answer = item.answer;
      }
    })
    return answer;
  }

  randomizeArray = (arr) => arr.sort(() => (Math.random() - 0.5))

  render() {
    return (
      <div>
        {(this.props.success === null || this.props.loading) ? <Spinner />
          :
          <div className='centered'>
            {!Object.keys(this.state.currentQuestion).length ?
              <div>
                <h2>Quiz name: {this.props.quiz.title}</h2>
                <p>Last modified: {this.props.quiz.date}</p>
                <Button onClick={this.startQuiz} bsSize='lg' bsStyle='primary'>Start</Button>
              </div>
              :
              <div>
                <Question
                  sendAnswers={this.getAnswers}
                  answer={this.getAnswer()}
                  question={this.state.currentQuestion || null}
                  index={this.state.prevQuestions.length}
                  />
                <div className={'quiz-nav'}>
                  <Button
                    onClick={this.prevQuestion}
                    disabled={!this.state.prevQuestions.length}
                    bsSize='lg'
                    bsStyle='primary'
                    className={'left'}>Prev</Button>
                  {this.state.nextQuestions.length ?
                    <Button
                      onClick={this.nextQuestion}
                      disabled={this.state.currentQuestion.isRequired && !this.state.answerIsValid}
                      bsSize='lg'
                      bsStyle='primary'
                      className={'right'}>Next</Button>
                    :
                    <Button
                      onClick={this.finishQuiz}
                      disabled={!this.state.answerIsValid}
                      bsSize='lg' bsStyle='primary'
                      className={'right'}>Finish</Button>
                  }
                </div>
              </div>
            }
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    quiz: store.quizReducer.quiz,
    loading: store.quizReducer.loading,
    success: store.quizReducer.success,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    get: (id) => getQuiz(id)(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)