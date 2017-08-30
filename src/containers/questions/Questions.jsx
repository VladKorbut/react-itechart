import React from 'react';
import propTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import Question from './QuestionSwitcher';

function Questions(props) {
  return (
    <div>
      {
        props.questions.length ?
          props.questions.map((question, index) => (<Question
            key={index}
            index={index}
            question={question}
            {...props}
          />))
          :
          <Alert>
            Questions Will Be Displayed Here
          </Alert>
      }
    </div>
  );
}

Question.propTypes = {
  questions: propTypes.arrayOf(propTypes.object),
};

export default Questions;
