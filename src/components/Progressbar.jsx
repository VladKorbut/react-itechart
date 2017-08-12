import React from 'react'
import { ProgressBar } from 'react-bootstrap'

function Progressbar(props) {
  const getCurrentState = () => {
    return props.current / props.length * 100
  }
  return <ProgressBar now={getCurrentState()} label={`${props.current}/${props.length}`} />
}

export default Progressbar