import React from 'react'
import { CHECKBOX, RADIO, STARS, TEXT } from '../../types/questions'
import Checkbox from './types/Checkbox'
import Radio from './types/Radio'
import Stars from './types/Stars'
import Text from './types/Text'

function StatisticSwitcher(props) {
  const types = {
    [CHECKBOX]: <Checkbox {...props} />,
    [RADIO]: <Radio {...props} />,
    [STARS]: <Stars {...props} />,
    [TEXT]: <Text {...props} />,
  }
  return types[props.question.type]
}

export default StatisticSwitcher