import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { Button, Col } from 'react-bootstrap'
import { getQuiz } from '../actions/getQuiz'
import Spinner from '../components/Spinner'
import Question from './questions/Question'
import createAnswers from '../db/answers'
import Progressbar from '../components/Progressbar'

const indexOfAnswer = (answers, id) => {
  let index = -1;
  answers.forEach((item, i) => {
    if (item.id === id) {
      index = i;
    }
  })
  return index;
}

const randomizeArray = (arr) => arr.sort(() => (Math.random() - 0.5))

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
    let questions = this.props.quiz.isRand ? randomizeArray(this.props.quiz.questions) : [...this.props.quiz.questions];
    this.setState({
      currentQuestion: questions.pop(),
      nextQuestions: questions
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
    let nextQuestions = this.state.nextQuestions;
    nextQuestions.push(this.state.currentQuestion);
    let currentQuestion = this.state.prevQuestions.pop();
    this.setState({
      nextQuestions: nextQuestions,
      currentQuestion: currentQuestion,
    });
    let answers = [...this.state.answers]
    answers.length = indexOfAnswer(this.state.answers, currentQuestion.id) + 1;
    this.setState({
      answerIsValid: !!(indexOfAnswer(this.state.answers, currentQuestion.id) + 1),
      answers: answers,
    });
  }

  finishQuiz = () => {
    let prevQuestions = this.state.prevQuestions;
    prevQuestions.push(this.state.currentQuestion);
    this.setState({ prevQuestions: prevQuestions });
    createAnswers(this.state.answers).then((data) => {
      this.setState({ currentQuestion: {}, nextQuestion: [], prevQuestions: [], answers: [] });
    })
  }

  getAnswers = (id, answer) => {
    let answers = this.state.answers;
    if (indexOfAnswer(answers, id) + 1) {
      answers[indexOfAnswer(answers, id)] = { id: id, answer: answer }
    } else {
      answers.push({ id: id, answer: answer });
    }
    this.setState({ answers: answers });
    if (answer !== 0 || answer.length) {
      this.setState({ answerIsValid: true })
    }
  }

  getAnswer = () => {
    let answer = [];
    const currentQuestionId = this.state.currentQuestion.id;
    this.state.answers.forEach((item, i) => {
      if (item.id === currentQuestionId) {
        answer = item.answer;
      }
    })
    return answer;
  }

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
              <Col md={8} lg={6} mdOffset={2} lgOffset={4}>
                <Question
                  sendAnswers={this.getAnswers}
                  answer={this.getAnswer()}
                  question={this.state.currentQuestion || null}
                  index={this.state.prevQuestions.length}
                />
                <Progressbar current={this.state.prevQuestions.length} length={this.props.quiz.questions.length}> </Progressbar>
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
              </Col>
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