import React, { Component } from 'react';
import propTypes from 'prop-types';
import Fa from 'react-fontawesome';
import { Button, ButtonGroup, Row } from 'react-bootstrap';
import { CHECKBOX, RADIO, STARS, TEXT } from '../types/questions';
import throttle from '../common/throttle';

const checkWidthLarge = width => width > 991;

class AddQuestions extends Component {
  constructor() {
    super();
    this.state = {
      isVertical: checkWidthLarge(window.innerWidth),
    };
    this.throttledCheckWidth = throttle(this.changeVerticalState, 50);
  }

  changeVerticalState = () => {
    this.setState({ isVertical: checkWidthLarge(window.innerWidth) });
  }

  componentDidMount() {
    window.addEventListener('resize', this.throttledCheckWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.throttledCheckWidth);
  }

  render() {
    return (
      <Row>
        <h4>Type Of Question</h4>
        <ButtonGroup vertical={this.state.isVertical}>
          <Button onClick={this.props.addQuestion(CHECKBOX)}>
            <Fa name="check-square-o" />
            <span className={'hidden-xs'}>Multiple choise</span>
          </Button>
          <Button onClick={this.props.addQuestion(RADIO)}>
            <Fa name="dot-circle-o" />
            <span className={'hidden-xs'}>Single choise</span>
          </Button>
          <Button onClick={this.props.addQuestion(STARS)}>
            <Fa name="star-half-o" />
            <span className={'hidden-xs'}>Stars rating</span>
          </Button>
          <Button onClick={this.props.addQuestion(TEXT)}>
            <Fa name="font" />
            <span className={'hidden-xs'}>Text input</span>
          </Button>
        </ButtonGroup>
      </Row>
    );
  }
}


AddQuestions.propTypes = {
  addQuestion: propTypes.func,
};

export default AddQuestions;
