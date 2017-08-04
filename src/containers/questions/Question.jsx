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
            <Multiple {...this.props}/>
          </Case>
          <Case value={2}>
            <Multiple {...this.props}/>
          </Case>
          <Case value={3}>
            <Single {...this.props}/>
          </Case>
          <Case value={4}>
            <Single {...this.props}/>
          </Case>
        </Switch>
      </div>
    )
  }
}

export default Question