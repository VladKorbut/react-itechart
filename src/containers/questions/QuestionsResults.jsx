import React from 'react';
import propTypes from 'prop-types';
import QuestionResult from './QuestionResultSwitcher';

function QuestionResults(props) {
  return (
    <div>
      {
        props.questions.map((question, index) => (<QuestionResult
          key={index}
          index={index}
          question={question}
        />))
      }
    </div>
  );
}

QuestionResults.propTypes = {
  questions: propTypes.arrayOf(propTypes.object),
};

export default QuestionResults;
