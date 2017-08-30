import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Checkbox, Radio, FormGroup, Panel } from 'react-bootstrap';
import { CHECKBOX } from '../../../types/questions';

class Multiple extends Component {
  constructor() {
    super();
    this.state = {
      answer: null,
    };
  }
  setAnswer = id => (e) => {
    let answer;
    if (e.target.type === 'checkbox') {
      answer = Array.isArray(this.state.answer) ? this.state.answer : [];
      if (e.target.checked) {
        answer.push(id);
      } else {
        answer.splice(answer.indexOf(id), 1);
      }
    } else {
      answer = id;
    }
    this.setState({ answer }, () => {
      this.props.sendAnswers(this.props.question.id, this.state.answer);
    });
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
              this.props.question.options.map(option => (
                <span key={option.id}>
                  {this.props.question.type === CHECKBOX ?
                    <Checkbox
                      onChange={this.setAnswer(option.id)}
                      checked={this.props.answer.indexOf(option.id) + 1}
                    >
                      {option.value}
                    </Checkbox>
                    :
                    <Radio
                      onChange={this.setAnswer(option.id)}
                      checked={this.props.answer === option.id}
                      name="radioGroup"
                    >
                      {option.value}
                    </Radio>
                  }
                </span>
              ))
            }
          </FormGroup>
        </Panel>
      </div>
    );
  }
}

Multiple.propTypes = {
  answer: propTypes.oneOfType([
    propTypes.number,
    propTypes.array,
    propTypes.string,
  ]),
  index: propTypes.number,
  question: propTypes.object,
  sendAnswers: propTypes.func,
};

export default Multiple;
