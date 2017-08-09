import React, { Component } from 'react'
import { Checkbox, Radio, FormGroup, Panel } from 'react-bootstrap'
import { CHECKBOX } from '../../../types/questions'

const initialState = {
  radioAnswer: 0,
  checkboxAnswer: [],
}

class Multiple extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
  setAnswer = (id) => (e) => {
    if (e.target.type === 'checkbox') {
      let answer = this.state.checkboxAnswer;
      if (e.target.checked) {
        answer.push(id);
      } else {
        answer.splice(answer.indexOf(id), 1);
      }
      this.setState({ checkboxAnswer: answer });
    } else {
      this.setState({radioAnswer: id, checkboxAnswer: []})
    }
    this.props.getValidState(this.state.checkboxAnswer.length || this.state.radioAnswer)
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
              this.props.question.options.map((option, index) => {
                return (
                  <span key={index}>
                    {this.props.question.type === CHECKBOX ?
                      <Checkbox onClick={this.setAnswer(option.id)}>{option.value}</Checkbox>
                      :
                      <Radio onClick={this.setAnswer(option.id)} name="radioGroup">{option.value}</Radio>
                    }
                  </span>
                )
              })
            }
          </FormGroup>
        </Panel>
      </div>
    )
  }
}

export default Multiple