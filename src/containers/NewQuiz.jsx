import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { FormControl, Col, Checkbox, Button, Row, ButtonGroup } from 'react-bootstrap'
import Fa from 'react-fontawesome'
import quiz from '../db/quiz'
import Questions from './questions/Questions'
import QuizLinkModal from '../components/QuizLinkModal'
import { CHECKBOX, RADIO, STARS, TEXT } from '../types/questions'

class NewQuiz extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      isAnon: false,
      isRand: false,
      questions: [],
      showModal: false,
      insertedQuiz: 0,
    }
  }
  componentWillMount() {
    if (!this.props.isLoggedIn) {
      browserHistory.push('/login');
    }
    if (this.props.quiz) {
      this.setState({
        title: this.props.quiz.title,
        isAnon: this.props.quiz.isAnon,
        isRand: this.props.quiz.isRand,
        questions: this.props.quiz.questions,
      })
    }
  }
  titleHandler = (e) => {
    this.setState({ title: e.target.value })
  }
  anonHandler = (e) => {
    this.setState({ isAnon: e.target.checked });
  }
  randHandler = (e) => {
    this.setState({ isRand: e.target.checked });
  }
  addQuestion = (type) => () => {
    let questions = [...this.state.questions];
    questions.push({ title: '', type: type, isRequired: true, options: [] });
    this.setState({ questions: questions });
  }
  editQuestion = (index, question) => {
    let questions = [...this.state.questions];
    questions[index] = question;
    this.setState({ questions: questions });
  }
  deleteQuestion = (index) => {
    let questions = [...this.state.questions];
    questions.splice(index, 1);
    this.setState({ questions: questions });
  }
  getButtonState = () => {
    let answersIsValid = true;
    this.state.questions.forEach((item, i) => {
      if (!item.isValid) {
        answersIsValid = false;
      }
    })
    return !(this.state.title.length && this.state.questions.length && answersIsValid);
  }
  createQuiz = () => {
    if (this.props.isLoggedIn) {
      quiz.create(this.state)
        .then((res) => {
          this.setState({
            insertedQuiz: res.insertId,
            showModal: true,
            title: '',
            isAnon: false,
            isRand: false,
            questions: [],
          })
        })
        .catch((error) => {
          console.error(error);
        })
    } else {
      alert(`You're not logged in!`);
      browserHistory.push('/login');
    }
  }
  openMadal = () => {
    this.setState({ showModal: true });
  }
  closeModal = () => {
    this.setState({ showModal: false });
  }
  render() {
    return (
      <div>
        <h2>Create Quiz</h2>
        <Col md={4} mdPush={8}>
          <Row>
            <h4>Type Of Question</h4>
            <ButtonGroup vertical>
              <Button onClick={this.addQuestion(CHECKBOX)}><Fa name='check-square-o'></Fa>Multiple choise</Button>
              <Button onClick={this.addQuestion(RADIO)}><Fa name='dot-circle-o'></Fa>Single choise</Button>
              <Button onClick={this.addQuestion(STARS)}><Fa name='star-half-o'></Fa>Stars rating</Button>
              <Button onClick={this.addQuestion(TEXT)}><Fa name='font'></Fa>Text input</Button>
            </ButtonGroup>
          </Row>
          <Row>
            <h4>Quiz params</h4>
            <Checkbox checked={this.state.isAnon} onChange={this.anonHandler}>
              Anonymous quiz
            </Checkbox>
            <Checkbox checked={this.state.isRand} onChange={this.randHandler}>
              Random Questions
            </Checkbox>
          </Row>
        </Col>
        <Col md={8} mdPull={4}>
          <FormControl
            type="text"
            bsSize={'large'}
            value={this.state.title}
            onChange={this.titleHandler}
            placeholder="Quiz Title"
          />
          <span>Number of questions: {this.state.questions.length}</span>
          <Questions
            edit
            questions={this.state.questions}
            editQuestion={this.editQuestion}
            deleteQuestion={this.deleteQuestion} />
          <Button bsStyle="primary" onClick={this.createQuiz} disabled={this.getButtonState()}>Create</Button>
        </Col>
        <QuizLinkModal quizId={this.state.insertedQuiz} show={this.state.showModal} close={this.closeModal} />
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    isLoggedIn: store.loginReducer.isLoggedIn
  }
}

export default connect(mapStateToProps, null)(NewQuiz)