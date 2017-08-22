import React from 'react'
import propTypes from 'prop-types'
import { ProgressBar } from 'react-bootstrap'

function Progressbar(props) {
  const getCurrentState = () => {
    return props.current / props.length * 100
  }
  return <ProgressBar now={getCurrentState()} label={`${props.current}/${props.length}`} />
}

Progressbar.propTypes = {
  current: propTypes.number,
  length: propTypes.number,
}

export default Progressbar