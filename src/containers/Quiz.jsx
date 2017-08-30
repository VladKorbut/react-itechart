import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Col } from 'react-bootstrap';
import { getQuiz } from '../actions/getQuiz';
import Spinner from '../components/Spinner';
import Question from './questions/QuestionSwitcher';
import answers from '../db/answers';
import Progressbar from '../components/Progressbar';

const indexOfAnswer = (answers, id) => answers.findIndex(item => item.id === id);

const randomizeArray = arr => arr.sort(() => (Math.random() - 0.5));

class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      currentQuestion: {},
      prevQuestions: [],
      nextQuestions: [],
      answerIsValid: false,
      answers: [],
    };
  }

  componentDidMount() {
    this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
    this.props.get(this.props.params.id);
  }

  routerWillLeave = () => {
    if (this.state.answers.length) {
      return 'Your work is not saved! Are you sure you want to leave?';
    }
    return null;
  }

  startQuiz = () => {
    const questions = this.props.quiz.isRand ?
      randomizeArray([...this.props.quiz.questions]) : [...this.props.quiz.questions];
    this.setState({
      currentQuestion: questions.pop(),
      nextQuestions: questions,
    });
  }

  nextQuestion = () => {
    const prevQuestions = [...this.state.prevQuestions];
    prevQuestions.push(this.state.currentQuestion);
    const nextQuestions = [...this.state.nextQuestions];
    const currentQuestion = nextQuestions.pop();
    this.setState({
      answerIsValid: false,
      prevQuestions,
      currentQuestion,
      nextQuestions,
    });
  }

  prevQuestion = () => {
    const nextQuestions = [...this.state.nextQuestions];
    nextQuestions.push(this.state.currentQuestion);
    const prevQuestions = [...this.state.prevQuestions];
    const currentQuestion = prevQuestions.pop();

    const answers = [...this.state.answers];
    answers.length = indexOfAnswer(this.state.answers, currentQuestion.id) + 1;
    this.setState({
      prevQuestions,
      currentQuestion,
      nextQuestions,
      answerIsValid: !!(indexOfAnswer(this.state.answers, currentQuestion.id) + 1),
      answers,
    });
  }

  finishQuiz = () => {
    const prevQuestions = [...this.state.prevQuestions];
    prevQuestions.push(this.state.currentQuestion);
    answers.createAnswers(this.state.answers, this.props.quiz.id).then(() => {
      this.setState({ currentQuestion: {}, nextQuestion: [], prevQuestions: [], answers: [] });
    });
  }

  getAnswers = (id, value) => {
    const answers = [...this.state.answers];
    if (indexOfAnswer(answers, id) + 1) {
      answers[indexOfAnswer(answers, id)] = { id, value };
    } else {
      answers.push({ id, value });
    }

    let answerIsValid;
    if (typeof value === 'number') {
      answerIsValid = !!value;
    } else {
      answerIsValid = !!value.length;
    }
    this.setState({ answers, answerIsValid });
  }

  getAnswer = () => {
    const answer = this.state.answers.find(item => item.id === this.state.currentQuestion.id);
    return answer ? answer.value : [];
  }

  render() {
    return (
      <div>{
        (this.props.success === null || this.props.loading)
          ? <Spinner /> :
          <div className="centered">
            {!Object.keys(this.state.currentQuestion).length ?
              <div>
                <h2>Quiz name: {this.props.quiz.title}</h2>
                <p>Last modified: {this.props.quiz.date}</p>
                <Button
                  onClick={this.startQuiz}
                  bsSize="lg"
                  bsStyle="primary"
                  disabled={!(this.props.isLoggedIn || this.props.quiz.isAnon)}
                >
                  Start
                </Button>
              </div>
              :
              <Col md={8} lg={6} mdOffset={2} lgOffset={4}>
                <Question
                  sendAnswers={this.getAnswers}
                  answer={this.getAnswer()}
                  question={this.state.currentQuestion || null}
                  index={this.state.prevQuestions.length}
                />
                <Progressbar
                  current={this.state.prevQuestions.length}
                  length={this.props.quiz.questions.length}
                />
                <div className={'quiz-nav'}>
                  <Button
                    onClick={this.prevQuestion}
                    disabled={!this.state.prevQuestions.length}
                    bsSize="lg"
                    bsStyle="primary"
                    className="left"
                  >Prev</Button>
                  {this.state.nextQuestions.length ?
                    <Button
                      onClick={this.nextQuestion}
                      disabled={this.state.currentQuestion.isRequired && !this.state.answerIsValid}
                      bsSize="lg"
                      bsStyle="primary"
                      className="right"
                    >Next</Button>
                    :
                    <Button
                      onClick={this.finishQuiz}
                      disabled={this.state.currentQuestion.isRequired && !this.state.answerIsValid}
                      bsSize="lg"
                      bsStyle="primary"
                      className="right"
                    >
                      Finish
                  </Button>
                  }
                </div>
              </Col>
            }
          </div>
      }
      </div>
    );
  }
}

const mapStateToProps = store => ({
  quiz: store.quizReducer.quiz,
  loading: store.quizReducer.loading,
  success: store.quizReducer.success,
  isLoggedIn: store.loginReducer.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  get: id => getQuiz(id)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
