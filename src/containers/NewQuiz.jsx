import React, { Component } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { FormControl, Col, Button, Row, Clearfix } from 'react-bootstrap'
import quiz from '../db/quiz'
import Questions from './questions/Questions'
import QuizLinkModal from '../components/QuizLinkModal'
import Settings from '../components/Settings'

class NewQuiz extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
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
  }
  componentDidMount() {
    if (this.props.quiz) {
      this.setState({
        id: this.props.quiz.id,
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
    questions[index] = Object.assign(questions[index], question);
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
        .then(res => {
          this.setState({
            insertedQuiz: (this.props.quiz && this.props.quiz.id) || res.insertId,
            showModal: true,
            title: '',
            isAnon: false,
            isRand: false,
            questions: [],
          })
        })
        .catch((error) => {
          throw new Error(error);
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
      <Clearfix>
        <h2>{this.props.edit ? 'Edit' : 'Create'} Quiz</h2>
        <Col md={3} mdPush={9} className='sticky'>
          <Settings
            addQuestion={this.addQuestion}
            anonHandler={this.anonHandler}
            isAnon={this.state.isAnon}
            randHandler={this.randHandler}
            isRand={this.state.isRand}
          />
          <Row>
            <Button
              bsStyle="primary"
              bsSize="lg"
              onClick={this.createQuiz}
              disabled={this.getButtonState()}
            >
              {this.props.edit ? 'Edit' : 'Create'}
            </Button>
          </Row>
        </Col>
        <Col md={8} mdPull={3}>
          <Row>
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
              deleteQuestion={this.deleteQuestion}
            />
          </Row>
        </Col>
        <QuizLinkModal quizId={this.state.insertedQuiz} show={this.state.showModal} close={this.closeModal} />
      </Clearfix>
    )
  }
}

NewQuiz.propTypes = {
  edit: propTypes.bool,
  quiz: propTypes.object,
  isLoggedIn: propTypes.bool,
}

const mapStateToProps = (store) => {
  return {
    isLoggedIn: store.loginReducer.isLoggedIn
  }
}

export default connect(mapStateToProps, null)(NewQuiz)