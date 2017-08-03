import React, { Component } from 'react'
import { Checkbox, FormControl, InputGroup, Button, Panel } from 'react-bootstrap'
import Fa from 'react-fontawesome'
import RatingStars from 'react-rating'

class Rating extends Component {
  componentWillReceiveProps(newProps) {
    this.setState({
      title: newProps.title,
      isRequired: newProps.isRequired,
    })
  }
  constructor() {
    super();
    this.state = {
      options: [],
      title: '',
      isRequired: true,
    }
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
          <InputGroup>
            <Checkbox checked={this.state.isRequired} onChange={this.requiredHandler} >
              Required
                </Checkbox>
            <Button onClick={this.deleteQuestion} bsStyle="danger"><Fa name='times' /></Button>
          </InputGroup>
        }
      >
        <RatingStars
          empty="fa fa-star-o fa-2x"
          full="fa fa-star fa-2x"
          initialRate={3}
          readonly
          />
      </Panel>
    )
  }
}

export default Rating