import React, { Component } from 'react'
import { Checkbox, Radio, FormControl, InputGroup, Button, Panel, Clearfix } from 'react-bootstrap'
import Fa from 'react-fontawesome'
import { CHECKBOX } from '../../../types/questions'

class Multiple extends Component {
  constructor() {
    super();
    this.state = {
      options: [],
      title: '',
      isRequired: true,
    }
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      options: newProps.question.options,
      title: newProps.question.title,
      isRequired: newProps.question.isRequired,
    })
  }
  addOption = () => {
    let options = this.state.options;
    options.push('');
    this.setState({ options: options });
    this.setOptions();
  }
  setOptions = () => {
    this.props.setOptions(this.props.index, this.state.options);
  }
  titleHandler = (e) => {
    this.setState({ title: e.target.value });
    this.props.titleHandler(this.props.index, e.target.value);
  }
  requiredHandler = (e) => {
    this.setState({ isRequired: e.target.checked });
    this.props.requiredHandler(this.props.index, e.target.checked);
  }
  deleteQuestion = (e) => {
    this.props.deleteQuestion(this.props.index);
  }
  optionHandler = (index) => (e) => {
    let options = this.state.options;
    options[index] = e.target.value;
    this.setState({ options: options });
    this.setOptions();
  }
  deleteOption = (index) => (e) => {
    let options = this.state.options;
    options.splice(index, 1);
    this.setState({ options: options });
    this.setOptions();
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
              <Button onClick={this.addOption}><Fa name='plus' /></Button>
            </InputGroup.Button>
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
        {
          this.state.options.map((option, index) => {
            return (
              <InputGroup key={index}>
                <InputGroup.Addon>
                  {this.props.question.type === CHECKBOX ?
                    <Checkbox checked={false} />
                    :
                    <Radio checked={false} />
                  }
                </InputGroup.Addon>
                <FormControl type="text" value={option} onChange={this.optionHandler(index)} placeholder={'Option ' + (index + 1)} />
                <InputGroup.Button>
                  <Button onClick={this.deleteOption(index)}><Fa name='times' /></Button>
                </InputGroup.Button>
              </InputGroup>
            )
          })
        }
      </Panel>
    )
  }
}

export default Multiple