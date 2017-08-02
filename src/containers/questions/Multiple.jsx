import React, { Component } from 'react'
import { Checkbox } from 'react-bootstrap'
class Multiple extends Component {
  constructor() {
    super();
    this.state = {
      options: ['First Option']
    }
  }
  addOption = () => {
    let options = this.state.options;
    options.push('New Option');
    this.setState({options: options});
    console.log(this.state.options);
    this.props.addOption(this.props.index, this.state.options);
  }
  render() {
    return (
      <div>
        <h5>{this.props.title}<a onClick={this.addOption}> + </a></h5>
        {
          this.state.options.map((option, index) => {
            return (
              <Checkbox key={index}>
                {option}
              </Checkbox>
            )
          })
        }
      </div>
    )
  }
}

export default Multiple