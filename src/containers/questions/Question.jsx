import React, { Component } from 'react'
import Switch, { Case } from 'react-switch-case'
import Multiple from './Multiple'
import Single from './Single'
import { CHECBOX, RADIO, STARS, TEXT } from '../../types/questions'

class Question extends Component {
  render() {
    return (
      <div>
        <Switch condition={this.props.question.type}>
          <Case value={CHECBOX}>
            <Multiple {...this.props}/>
          </Case>
          <Case value={RADIO}>
            <Multiple {...this.props}/>
          </Case>
          <Case value={STARS}>
            <Single {...this.props}/>
          </Case>
          <Case value={TEXT}>
            <Single {...this.props}/>
          </Case>
        </Switch>
      </div>
    )
  }
}

export default Question