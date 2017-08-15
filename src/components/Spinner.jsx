import React from 'react'
import { BarLoader } from 'react-spinners'

function Spinner() {
  return (
    <div className={'spinner'}>
      <BarLoader color={'#555'} loading />
    </div>
  )
}

export default Spinner