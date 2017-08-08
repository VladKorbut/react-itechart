import React, { Component } from 'react'
import { Checkbox, Radio, FormGroup, Panel } from 'react-bootstrap'
import { CHECKBOX } from '../../../types/questions'

class Multiple extends Component {
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
                      <Checkbox>{option}</Checkbox>
                      :
                      <Radio name="radioGroup">{option}</Radio>
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