import React, { Component } from 'react'
import Switch, { Case } from 'react-switch-case'
import Multiple from './Multiple'
import Single from './Single'

class Question extends Component {
  render() {
    return (
      <div>
        <Switch condition={this.props.question.type}>
          <Case value={1}>
            <Multiple
              title={this.props.question.title}
              options={this.props.question.options}
              isRequired={this.props.question.isRequired}
              index={this.props.index}
              setOptions={this.props.setOptions}
              titleHandler={this.props.titleHandler}
              requiredHandler={this.props.requiredHandler}
              deleteQuestion={this.props.deleteQuestion} />
          </Case>
          <Case value={2}>
            <Single
              title={this.props.question.title}
              options={this.props.question.options}
              isRequired={this.props.question.isRequired}
              index={this.props.index}
              setOptions={this.props.setOptions}
              titleHandler={this.props.titleHandler}
              requiredHandler={this.props.requiredHandler}
              deleteQuestion={this.props.deleteQuestion} />
          </Case>
        </Switch>
      </div>
    )
  }
}

export default Question