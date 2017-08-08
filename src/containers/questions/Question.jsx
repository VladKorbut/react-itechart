import React, { Component } from 'react'
import Switch, { Case } from 'react-switch-case'
import MultipleEdit from './edit/Multiple'
import SingleEdit from './edit/Single'

import Multiple from './show/Multiple'
import Single from './show/Single'
import { CHECKBOX, RADIO, STARS, TEXT } from '../../types/questions'

class Question extends Component {
  render() {
    return (
      <div>
        <Switch condition={this.props.question.type}>
          <Case value={CHECKBOX}>
            {this.props.edit ? <MultipleEdit {...this.props} /> : <Multiple {...this.props} />}
          </Case>
          <Case value={RADIO}>
            {this.props.edit ? <MultipleEdit {...this.props} /> : <Multiple {...this.props} />}
          </Case>
          <Case value={STARS}>
            {this.props.edit ? <SingleEdit {...this.props} /> : <Single {...this.props} />}
          </Case>
          <Case value={TEXT}>
            {this.props.edit ? <SingleEdit {...this.props} /> : <Single {...this.props} />}
          </Case>
        </Switch>
      </div>
    )
  }
}

export default Question