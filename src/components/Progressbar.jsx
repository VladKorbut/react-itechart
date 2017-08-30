import React from 'react';
import propTypes from 'prop-types';
import { ProgressBar } from 'react-bootstrap';

function Progressbar(props) {
  const getCurrentState = () => (props.current / props.length) * 100;
  return <ProgressBar now={getCurrentState()} label={`${props.current}/${props.length}`} />;
}

Progressbar.defaultProps = {
  current: 0,
  length: 0,
};

Progressbar.propTypes = {
  current: propTypes.number,
  length: propTypes.number,
};

export default Progressbar;
