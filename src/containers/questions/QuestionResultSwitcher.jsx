import React from 'react';
import Multiple from './result/Multiple';
import Single from './result/Single';
import { RADIO, TEXT } from '../../types/questions';

function QuestionResult(props) {
  const questions = {
    multiple: <Multiple {...props} />,
    single: <Single {...props} />,
  };
  if (props.question.type <= RADIO) {
    return questions.multiple;
  }
  if (props.question.type <= TEXT) {
    return questions.single;
  }
}

export default QuestionResult;
