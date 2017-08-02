import React, { Component } from 'react'
import Switch, { Case } from 'react-switch-case'
import Multiple from './Multiple'

class Question extends Component {
  render() {
    return (
      <div>
        <Switch condition={this.props.question.type}>
          <Case value={1}>
            <Multiple title={this.props.question.title} options={this.props.question.options} index={this.props.index} addOption={this.props.addOption}/>
          </Case>
        </Switch>
      </div>
    )
  }
}

export default Question