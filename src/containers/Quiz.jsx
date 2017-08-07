import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { getQuiz } from '../actions/getQuiz'
import Spinner from '../components/Spinner'

class Quiz extends Component {
  componentWillMount() {
    this.props.get(this.props.params.id)
      .then((data) => {
        if (!data) {
          browserHistory.push('/404');
        }
      })
  }
  componentDidUpdate() {
    console.log(this.props);
  }
  render() {
    return (
      <div>
        {this.props.loading ?
          <Spinner />
          : (
            <div>
              <h1>Quiz: {this.props.quiz.title}</h1>
              <ol>
                {
                  this.props.success ?
                    this.props.quiz.questions.map((question, i) => (
                      <li key={i}>{question.title}
                        <ol>
                          {
                            question.options ?
                              question.options.map((option, i) => (
                                <li key={i}>{option}</li>
                              ))
                              : ''
                          }
                        </ol>
                      </li>)
                    )
                    : ''
                }
              </ol>
            </div>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    success: store.quizReducer.success,
    loading: store.quizReducer.loading,
    quiz: store.quizReducer.quiz,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    get: (id) => getQuiz(id)(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)