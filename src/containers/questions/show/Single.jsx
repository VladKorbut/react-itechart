import React, { Component } from 'react';
import propTypes from 'prop-types';
import RatingStars from 'react-rating';
import { FormGroup, FormControl, Panel } from 'react-bootstrap';
import { STARS } from '../../../types/questions';
import keyHandle from '../../../common/handleKeys';

class Single extends Component {
  constructor() {
    super();
    this.state = {
      answer: '',
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
                  initialRate={Array.isArray(this.props.answer) ? 0 : this.props.answer}
                  onChange={this.setStars}
                />
                :
                <FormControl
                  componentClass="textarea"
                  placeholder="Answer will be here"
                  value={this.props.answer}
                  onChange={this.setText}
                  onKeyDown={keyHandle}
                  onKeyUp={keyHandle}
                />
            }
          </FormGroup>
        </Panel>
      </div>
    );
  }
}

Single.propTypes = {
  answer: propTypes.oneOfType([
    propTypes.string,
    propTypes.number,
    propTypes.array,
  ]),
  index: propTypes.number,
  question: propTypes.object,
  sendAnswers: propTypes.func,
};

export default Single;
