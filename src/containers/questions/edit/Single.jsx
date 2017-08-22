import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Checkbox, FormControl, InputGroup, Button, Panel, Clearfix } from 'react-bootstrap';
import Fa from 'react-fontawesome';
import RatingStars from 'react-rating';
import { STARS } from '../../../types/questions';

class Single extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      isRequired: true,
      type: 0,
      isValid: false,
    }
  }
  componentDidMount() {
    this.setState({
      title: this.props.question.title,
      isRequired: this.props.question.isRequired,
      type: this.props.question.type,
    }, this.validateQuestion)
  }
  editQuestion = () => {
    this.props.editQuestion(this.props.index, this.state);
  }
  validateQuestion = () => {
    this.setState({
      isValid: !!this.state.title.length
    }, this.editQuestion);
  }
  titleHandler = (e) => {
    this.setState({ title: e.target.value }, this.validateQuestion);
  }
  requiredHandler = (e) => {
    this.setState({ isRequired: e.target.checked }, this.validateQuestion);
  }
  deleteQuestion = (e) => {
    this.props.deleteQuestion(this.props.index);
  }
  render() {
    return (
      <Panel
        header={
          <InputGroup>
            <InputGroup.Addon>{this.props.index + 1}</InputGroup.Addon>
            <FormControl
              placeholder={'Question Title'}
              value={this.state.title}
              onChange={this.titleHandler}
            />
          </InputGroup>
        }
        footer={
          <Clearfix>
            <Checkbox checked={this.state.isRequired} onChange={this.requiredHandler} className='pull-left'>
              Required
                </Checkbox>
            <Button onClick={this.deleteQuestion} bsStyle="danger" className='pull-right'><Fa name='times' /></Button>
          </Clearfix>
        }
      >
        {this.props.question.type === STARS ?
          <RatingStars
            empty="fa fa-star-o fa-2x"
            full="fa fa-star fa-2x"
            initialRate={3}
            readonly
          />
          :
          <FormControl disabled componentClass="textarea" placeholder="Answer will be here" />
        }
      </Panel>
    )
  }
}

Single.propTypes = {
  edit: propTypes.bool,
  index: propTypes.number,
  question: propTypes.object,
  editQuestion: propTypes.func,
  deleteQuestion: propTypes.func,
}

export default Single