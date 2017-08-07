import React, { Component } from 'react'

class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      quiz: {}
    }
  }
  componentWillMount() {
  }
  render() {
    return (
      <div>
        <h1>Quiz: {this.props.params.id}</h1>
      </div>
    )
  }
}

export default Quiz