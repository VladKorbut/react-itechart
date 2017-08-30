import React from 'react';
import { Thumbnail } from 'react-bootstrap';
import { CHECKBOX, RADIO, STARS, TEXT } from '../../types/questions';
import Checkbox from './types/Checkbox';
import Radio from './types/Radio';
import Stars from './types/Stars';
import Text from './types/Text';

function StatisticSwitcher(props) {
  const types = {
    [CHECKBOX]: <Checkbox {...props} />,
    [RADIO]: <Radio {...props} />,
    [STARS]: <Stars {...props} />,
    [TEXT]: <Text {...props} />,
  };
  return <Thumbnail>{types[props.question.type]}</Thumbnail>;
}

export default StatisticSwitcher;
