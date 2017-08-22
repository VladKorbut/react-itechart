import React from 'react';
import MultipleEdit from './edit/Multiple';
import SingleEdit from './edit/Single';

import Multiple from './show/Multiple';
import Single from './show/Single';
import { RADIO, TEXT } from '../../types/questions';

function Question(props) {
  const questions = {
    multiple: props.edit ? <MultipleEdit {...props} /> : <Multiple {...props} />,
    single: props.edit ? <SingleEdit {...props} /> : <Single {...props} />,
  };
  if (props.question.type <= RADIO) {
    return questions.multiple;
  }
  if (props.question.type <= TEXT) {
    return questions.single;
  }
}

export default Question;
