import React, { Component } from 'react'
import { Checkbox, FormControl, InputGroup, Button, Panel, Clearfix } from 'react-bootstrap'
import Fa from 'react-fontawesome'
import RatingStars from 'react-rating'
import { STARS } from '../../../types/questions'

class Rating extends Component {
  constructor() {
    super();
    this.state = {
      options: [],
      title: '',
      isRequired: true,
    }
  }
  componentWillMount() {
    console.log('mounted')
    this.setState({
      title: this.props.question.title,
      isRequired: this.props.question.isRequired,
    })
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

export default Rating