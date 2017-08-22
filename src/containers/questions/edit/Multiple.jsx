import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Checkbox, Radio, FormControl, InputGroup, Button, Panel, Clearfix } from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { CHECKBOX } from '../../../types/questions';

class Multiple extends Component {
  constructor() {
    super();
    this.state = {
      options: [],
      title: '',
      isRequired: true,
      type: 0,
      isValid: false,
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      options: props.question.options,
      title: props.question.title,
      isRequired: props.question.isRequired,
      type: props.question.type,
    }, this.validateQuestion);
  }

  validateQuestion = () => {
    const optionsIsValid = !this.state.options.find(option => !option.value.length);
    this.setState({
      isValid: !!(optionsIsValid && this.props.question.title.length
        && this.props.question.options.length > 1),
    }, this.editQuestion);
  }
  editQuestion = () => {
    this.props.editQuestion(this.props.index, this.state);
  }
  addOption = () => {
    const options = [...this.state.options];
    options.push({ value: '' });
    this.setState({ options }, this.validateQuestion);
  }
  deleteOption = index => () => {
    const options = [...this.state.options];
    options.splice(index, 1);
    this.setState({ options }, this.validateQuestion);
  }
  optionHandler = index => (e) => {
    const options = [...this.state.options];
    options[index].value = e.target.value;
    this.setState({ options }, this.validateQuestion);
  }
  titleHandler = (e) => {
    this.setState({ title: e.target.value }, this.validateQuestion);
  }
  requiredHandler = (e) => {
    this.setState({ isRequired: e.target.checked }, this.validateQuestion);
  }
  deleteQuestion = () => {
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
            <InputGroup.Button>
              <Button onClick={this.addOption}><Fa name="plus" /></Button>
            </InputGroup.Button>
          </InputGroup>
        }
        footer={
          <Clearfix>
            <Checkbox checked={this.state.isRequired} onChange={this.requiredHandler} className="pull-left">
              Required
                </Checkbox>
            <Button onClick={this.deleteQuestion} bsStyle="danger" className="pull-right"><Fa name="times" /></Button>
          </Clearfix>
        }
      >
        {
          this.state.options.map((option, index) => (
            <InputGroup key={index}>
              <InputGroup.Addon>
                {this.props.question.type === CHECKBOX ?
                  <Checkbox checked disabled />
                  :
                  <Radio checked disabled />
                }
              </InputGroup.Addon>
              <FormControl type="text" value={option.value} onChange={this.optionHandler(index)} placeholder={`Option ${(index + 1)}`} />
              <InputGroup.Button>
                <Button onClick={this.deleteOption(index)}><Fa name="times" /></Button>
              </InputGroup.Button>
            </InputGroup>
          ))
        }
      </Panel>
    );
  }
}

Multiple.propTypes = {
  index: propTypes.number,
  question: propTypes.object,
  editQuestion: propTypes.func,
  deleteQuestion: propTypes.func,
};

export default Multiple;
