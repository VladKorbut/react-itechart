import React, { Component } from 'react'
import { BarLoader } from 'react-spinners'

class Spinner extends Component {
  render() {
    return (
      <div className={'spinner'}>
        <BarLoader color={'#555'} loading={true}/>
      </div>
    )
  }
}

export default Spinner