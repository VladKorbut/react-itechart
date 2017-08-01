import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { FormControl, ControlLabel, Col, Checkbox, Button, Row } from 'react-bootstrap'
import quiz from '../db/quiz'

class NewQuiz extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      isAnon: false,
      isRand: false,
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
    return !this.state.title.length;
  }
  createQuiz = () => {
    if (this.props.isLoggedIn) {
      quiz.create(this.state.title, this.state.isAnon, this.state.isRand).then(() => {
        this.setState({
          title: '',
          isAnon: false,
          isRand: false,
        })
        alert('Quiz have been created!')
      });
    } else {
      alert(`You're not logged in!`);
      browserHistory.push('/login');
    }
  }
  render() {
    return (
      <div>
        <Row><h2>Create Quiz</h2></Row>
        <Col md={8}>
          <ControlLabel>New Quiz</ControlLabel>
          <FormControl
            type="text"
            value={this.state.title}
            placeholder="Quiz Title"
            onChange={this.titleHandler}
          />
        </Col>
        <Col md={4}>
          <Row>
            <h4>Type Of Question</h4>
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
        <Button bsStyle="primary" onClick={this.createQuiz} disabled={this.getButtonState()}>Create</Button>
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