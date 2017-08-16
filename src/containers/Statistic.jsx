import React, { Component } from 'react'

class Statistic extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        {this.props.params.id}
      </div>
    )
  }
}



export default Statistic