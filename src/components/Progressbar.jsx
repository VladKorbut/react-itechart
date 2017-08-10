import React, { Component } from 'react'
import { ProgressBar } from 'react-bootstrap'

class Progressbar extends Component {
  getCurrentState = () => {
    return this.props.current / this.props.length * 100
  }
  render() {
    return (
      <div>
        <ProgressBar now={this.getCurrentState()} label={`${this.props.current}/${this.props.length}`} />
      </div>
    )
  }
}

export default Progressbar