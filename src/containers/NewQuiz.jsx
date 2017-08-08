import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { FormControl, Col, Checkbox, Button, Row, ButtonGroup } from 'react-bootstrap'
import Fa from 'react-fontawesome'
import quiz from '../db/quiz'
import Questions from './questions/Questions.jsx'
import { CHECKBOX, RADIO, STARS, TEXT } from '../types/questions'

class NewQuiz extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      isAnon: false,
      isRand: false,
      questions: [],
    }
  }
  componentWillMount() {
    if (!this.props.isLoggedIn) {
      browserHistory.push('/login');
    }
  }
  titleHandler = (e) => {
    e.preventDefault();
    this.setState({ title: e.target.value })
  }
  anonHandler = (e) => {
    this.setState({ isAnon: e.target.checked });
  }
  randHandler = (e) => {
    this.setState({ isRand: e.target.checked });
  }
  getButtonState = () => {
    return !(this.state.title.length && this.state.questions.length);
  }
  createQuiz = () => {
    if (this.props.isLoggedIn) {
      quiz.create(this.state)
        .then((res) => {
          this.setState({
            title: '',
            isAnon: false,
            isRand: false,
            questions: [],
          })
        })
    } else {
      alert(`You're not logged in!`);
      browserHistory.push('/login');
    }
  }
  addQuestion = (type) => () => {
    let questions = this.state.questions;
    questions.push({ title: '', type: type, isRequired: true, options: [] });
    this.setState({ questions: questions });
  }
  setOptions = (index, options) => {
    let questions = this.state.questions;
    questions[index].options = options;
    this.setState({ questions: questions });
  }
  questionTitleHandler = (index, newTitle) => {
    let questions = this.state.questions;
    questions[index].title = newTitle;
    this.setState({ questions: questions });
  }
  questionRequiredHandler = (index, status) => {
    let questions = this.state.questions;
    questions[index].isRequired = status;
    this.setState({ questions: questions });
  }
  deleteQuestion = (index) => {
    let questions = this.state.questions;
    questions.splice(index, 1);
    this.setState({ questions: questions });
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
            placeholder="Quiz Title"
            onChange={this.titleHandler}
          />
          <span>Number of questions: {this.state.questions.length}</span>
          <Questions
            questions={this.state.questions}
            edit={true}
            setOptions={this.setOptions}
            titleHandler={this.questionTitleHandler}
            requiredHandler={this.questionRequiredHandler}
            deleteQuestion={this.deleteQuestion} />
          <Button bsStyle="primary" onClick={this.createQuiz} disabled={this.getButtonState()}>Create</Button>
        </Col>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    isLoggedIn: store.loginReducer
  }
}

export default connect(mapStateToProps, null)(NewQuiz)