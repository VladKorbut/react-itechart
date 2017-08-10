import React, { Component } from 'react'
import { FormGroup, FormControl, Panel } from 'react-bootstrap'
import { STARS } from '../../../types/questions'
import RatingStars from 'react-rating'

class Single extends Component {
  constructor() {
    super();
    this.state = {
      answer: null,
    };
  }
  setStars = (rate) => {
    this.setState({ answer: rate });
    this.props.sendAnswers(this.props.question.id, rate);
  }
  setText = (e) => {
    this.setState({ answer: e.target.value });
    this.props.sendAnswers(this.props.question.id, e.target.value);
  }
  render() {
    console.log(this.state.answer);
    return (
      <div>
        <Panel
          header={
            <h3>
              {this.props.index + 1} {this.props.question.title}
              {this.props.question.isRequired ? <span className={'required'}>*</span> : null}
            </h3>
          }
        >
          <FormGroup>
            {
              this.props.question.type === STARS ?
                <RatingStars
                  empty="fa fa-star-o fa-2x"
                  full="fa fa-star fa-2x"
                  initialRate={this.state.answer}
                  onChange={this.setStars}
                />
                :
                <FormControl componentClass="textarea" placeholder="Answer will be here" onChange={this.setText} />
            }
          </FormGroup>
        </Panel>
      </div>
    )
  }
}

export default Single